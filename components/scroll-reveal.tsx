"use client"

import { useEffect } from "react"

/**
 * Anima a entrada dos blocos conforme a mãe rola.
 *
 * A regra que não pode ser quebrada: **só anima o que nasce fora da primeira
 * dobra.** O scroll depth médio do Clarity é 20% — a primeira tela é a única
 * que a maioria vê, e deixá-la parada em `opacity: 0` esperando um
 * IntersectionObserver troca uma animação bonita por uma página em branco no
 * primeiro segundo, justamente para quem não vai rolar.
 *
 * Por isso o estado escondido (`reveal-armado`) é aplicado aqui em JS, depois
 * do primeiro layout, e não no CSS: sem JS, ou com o observer indisponível,
 * a página fica exatamente como está hoje. `prefers-reduced-motion` é
 * respeitado no CSS, que neutraliza as duas classes.
 */
export function ScrollReveal() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    )
    if (alvos.length === 0) return

    const dobra = window.innerHeight * 0.92
    const espera = alvos.filter((el) => {
      if (el.getBoundingClientRect().top <= dobra) return false
      el.classList.add("reveal-armado")
      return true
    })

    if (espera.length === 0) return

    if (!("IntersectionObserver" in window)) {
      espera.forEach((el) => el.classList.add("reveal-visivel"))
      return
    }

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return
          entrada.target.classList.add("reveal-visivel")
          observer.unobserve(entrada.target)
        })
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    )

    espera.forEach((el, i) => {
      // Escalonamento curto: irmãos próximos entram em cascata, não em bloco.
      el.style.transitionDelay = `${(i % 4) * 60}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
