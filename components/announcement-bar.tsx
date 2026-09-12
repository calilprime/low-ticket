export function AnnouncementBar() {
  return (
    // O ⚠️ saiu: sinalizava alarme para uma frase que não tem nada de
    // alarmante, e gastava o único emoji da primeira tela em ruído.
    <div className="sticky top-0 z-40 bg-[linear-gradient(100deg,var(--gold),color-mix(in_oklab,var(--gold)_70%,var(--primary)))] px-4 py-2.5 text-center">
      <p className="text-pretty text-[11px] font-extrabold uppercase leading-snug tracking-wide text-[oklch(0.25_0.02_60)] sm:text-sm">
        O plano de 9 dias chega no seu e-mail em até 2 minutos
      </p>
    </div>
  )
}
