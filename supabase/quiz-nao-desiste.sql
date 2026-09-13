-- ============================================================
-- QUIZ — Devocional da Mãe que Não Desiste
-- Leituras do painel /banco-quiz.
--
-- Rodar INTEIRO no SQL Editor do Supabase (projeto asjakwljvzjotycmgtwd).
-- Idempotente: pode rodar de novo sem quebrar nada.
--
-- NÃO cria tabela nem coluna. O quiz grava em quiz_eventos com as colunas que
-- já existem desde o Mãe Serena, marcando variante = 'nd_quiz'. Por isso ele
-- funciona antes deste SQL rodar — só o painel depende dele.
--
-- Por que funções novas em vez de alterar as antigas: as do Mãe Serena
-- (funil_quiz, serie_quiz...) não filtram por variante. Alterar a assinatura
-- delas quebraria o painel antigo; somar as duas variantes misturaria os dois
-- produtos no mesmo funil.
-- ============================================================

create index if not exists quiz_eventos_variante_idx
  on quiz_eventos (variante, criado_em);

-- ------------------------------------------------------------
-- Funil por etapa (sessões distintas)
-- ------------------------------------------------------------
create or replace function funil_quiz_v2(
  desde timestamptz,
  p_variante text,
  p_content text default null
)
returns table (ordem int, etapa text, sessoes bigint)
language sql stable security definer set search_path = public as $$
  select e.ordem, e.etapa, count(distinct e.sessao)
  from quiz_eventos e
  where e.criado_em >= desde
    and e.variante = p_variante
    and not coalesce(e.is_dev, false)
    and not coalesce(e.is_bot, false)
    and (p_content is null or e.utm_content = p_content)
  group by e.ordem, e.etapa
  order by e.ordem;
$$;

-- ------------------------------------------------------------
-- Série diária (fuso de São Paulo)
-- ------------------------------------------------------------
create or replace function serie_quiz_v2(
  desde timestamptz,
  p_variante text,
  p_content text default null
)
returns table (dia date, etapa text, sessoes bigint)
language sql stable security definer set search_path = public as $$
  select (e.criado_em at time zone 'America/Sao_Paulo')::date, e.etapa, count(distinct e.sessao)
  from quiz_eventos e
  where e.criado_em >= desde
    and e.variante = p_variante
    and not coalesce(e.is_dev, false)
    and not coalesce(e.is_bot, false)
    and (p_content is null or e.utm_content = p_content)
  group by 1, 2
  order by 1, 2;
$$;

-- ------------------------------------------------------------
-- Respostas por pergunta.
-- Conta a ÚLTIMA resposta de cada sessão por etapa: quem volta e troca de
-- resposta contaria duas vezes num count(*) simples.
-- ------------------------------------------------------------
create or replace function respostas_quiz_v2(
  desde timestamptz,
  p_variante text,
  p_content text default null
)
returns table (ordem int, etapa text, resposta text, total bigint)
language sql stable security definer set search_path = public as $$
  with ultima as (
    select distinct on (e.sessao, e.etapa)
      e.ordem, e.etapa, e.resposta
    from quiz_eventos e
    where e.criado_em >= desde
      and e.variante = p_variante
      and e.resposta is not null
      and e.etapa in ('p1', 'p2', 'p3', 'p4', 'compromisso')
      and not coalesce(e.is_dev, false)
      and not coalesce(e.is_bot, false)
      and (p_content is null or e.utm_content = p_content)
    order by e.sessao, e.etapa, e.criado_em desc
  )
  select u.ordem, u.etapa, u.resposta, count(*)
  from ultima u
  group by 1, 2, 3
  order by 1, 4 desc;
$$;

-- ------------------------------------------------------------
-- Perfis que saíram no resultado
-- ------------------------------------------------------------
create or replace function perfis_quiz_v2(
  desde timestamptz,
  p_variante text,
  p_content text default null
)
returns table (perfil text, sessoes bigint, checkout bigint)
language sql stable security definer set search_path = public as $$
  with r as (
    select e.sessao, max(e.perfil) filter (where e.etapa = 'resultado') as perfil,
           bool_or(e.etapa = 'checkout') as foi_checkout
    from quiz_eventos e
    where e.criado_em >= desde
      and e.variante = p_variante
      and not coalesce(e.is_dev, false)
      and not coalesce(e.is_bot, false)
      and (p_content is null or e.utm_content = p_content)
    group by e.sessao
  )
  select r.perfil, count(*), count(*) filter (where r.foi_checkout)
  from r
  where r.perfil is not null
  group by 1
  order by 2 desc;
$$;

-- ------------------------------------------------------------
-- Por anúncio (utm_content = nome do anúncio no Meta)
-- ------------------------------------------------------------
create or replace function anuncios_quiz_v2(
  desde timestamptz,
  p_variante text
)
returns table (anuncio text, abriram bigint, responderam bigint, resultado bigint, oferta bigint, checkout bigint)
language sql stable security definer set search_path = public as $$
  select coalesce(e.utm_content, '(sem utm_content)'),
    count(distinct e.sessao) filter (where e.etapa = 'abertura'),
    count(distinct e.sessao) filter (where e.etapa = 'p1'),
    count(distinct e.sessao) filter (where e.etapa = 'resultado'),
    count(distinct e.sessao) filter (where e.etapa = 'oferta_vista'),
    count(distinct e.sessao) filter (where e.etapa = 'checkout')
  from quiz_eventos e
  where e.criado_em >= desde
    and e.variante = p_variante
    and not coalesce(e.is_dev, false)
    and not coalesce(e.is_bot, false)
  group by 1
  order by 2 desc;
$$;

-- ------------------------------------------------------------
-- Tempo mediano: abertura → resultado, e resultado → checkout.
-- Tempo longo no resultado com checkout baixo = a oferta não convence.
-- Tempo curto demais até o resultado = gente tocando sem ler.
-- ------------------------------------------------------------
create or replace function tempo_quiz_v2(
  desde timestamptz,
  p_variante text,
  p_content text default null
)
returns table (mediana_resultado_s double precision, mediana_decisao_s double precision, amostra_resultado bigint, amostra_decisao bigint)
language sql stable security definer set search_path = public as $$
  with s as (
    select e.sessao,
      min(e.criado_em) filter (where e.etapa = 'abertura')  as a,
      min(e.criado_em) filter (where e.etapa = 'resultado') as r,
      min(e.criado_em) filter (where e.etapa = 'checkout')  as c
    from quiz_eventos e
    where e.criado_em >= desde
      and e.variante = p_variante
      and not coalesce(e.is_dev, false)
      and not coalesce(e.is_bot, false)
      and (p_content is null or e.utm_content = p_content)
    group by e.sessao
  )
  select
    percentile_cont(0.5) within group (order by extract(epoch from (r - a))) filter (where a is not null and r is not null),
    percentile_cont(0.5) within group (order by extract(epoch from (c - r))) filter (where r is not null and c is not null),
    count(*) filter (where a is not null and r is not null),
    count(*) filter (where r is not null and c is not null)
  from s;
$$;

grant execute on function funil_quiz_v2(timestamptz, text, text)     to anon;
grant execute on function serie_quiz_v2(timestamptz, text, text)     to anon;
grant execute on function respostas_quiz_v2(timestamptz, text, text) to anon;
grant execute on function perfis_quiz_v2(timestamptz, text, text)    to anon;
grant execute on function anuncios_quiz_v2(timestamptz, text)        to anon;
grant execute on function tempo_quiz_v2(timestamptz, text, text)     to anon;
