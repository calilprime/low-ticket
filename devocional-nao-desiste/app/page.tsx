import { AnnouncementBar } from "@/components/announcement-bar"
import { HeroSection } from "@/components/hero-section"
import { PainSection } from "@/components/pain-section"
import { WhatsInside } from "@/components/whats-inside"
import { DayTimeline } from "@/components/day-timeline"
import { Testimonials } from "@/components/testimonials"
import { OfferSection } from "@/components/offer-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { StickyCta } from "@/components/sticky-cta"

export default function Page() {
  return (
    <main className="bg-background pb-20 md:pb-0">
      <AnnouncementBar />
      <HeroSection />
      <PainSection />
      <WhatsInside />
      <DayTimeline />
      <Testimonials />
      <OfferSection />
      <GuaranteeSection />
      <FaqSection />
      <SiteFooter />
      <StickyCta />
    </main>
  )
}
