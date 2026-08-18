import { HeroSection } from "@/components/hero-section"
import { PainSection } from "@/components/pain-section"
import { WhatsInside } from "@/components/whats-inside"
import { DayTimeline } from "@/components/day-timeline"
import { Testimonials } from "@/components/testimonials"
import { OfferSection } from "@/components/offer-section"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="bg-background">
      <HeroSection />
      <PainSection />
      <WhatsInside />
      <DayTimeline />
      <Testimonials />
      <OfferSection />
      <FaqSection />
      <SiteFooter />
    </main>
  )
}
