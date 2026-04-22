import TickerBanner from "@/components/TickerBanner";
import Navbar from "@/components/Navbar";
import KalyanotsavaHero from "@/components/KalyanotsavaHero";
import EventGallery from "@/components/EventGallery";
import SevasGuidelines from "@/components/SevasGuidelines";
import EventTimeline from "@/components/EventTimeline";
import WarmlyWelcomed from "@/components/WarmlyWelcomed";
import DevotionalGallery from "@/components/DevotionalGallery";
import LocationSection from "@/components/LocationSection";
import SponsorCarousel from "@/components/SponsorCarousel";
import SocialSection from "@/components/SocialSection";
import DevotionalQuotes from "@/components/DevotionalQuotes";
import ParkingSection from "@/components/ParkingSection";
import SiteFooter from "@/components/SiteFooter";
import ParticleEffect from "@/components/ParticleEffect";
import DivineAura from "@/components/DivineAura";
import { AudioToggle, EmergencyContactToggle } from "@/components/InteractiveControls";
import { Toaster } from "sonner";

/* 
  Initial Template Components (Commented out for future reference):
  import HeroSection from "@/components/HeroSection";
  import TempleExperience from "@/components/TempleExperience";
  import SevasSection from "@/components/SevasSection";
  import GallerySection from "@/components/GallerySection";
  import QuotesSection from "@/components/QuotesSection";
  import DonationSection from "@/components/DonationSection";
*/
import AboutSection from "@/components/AboutSection";
import SoulfulJourneyVideo from "@/components/SoulfulJourneyVideo";


const Index = () => {
  return (
    <div className="relative overflow-x-hidden bg-temple-black selection:bg-primary selection:text-primary-foreground">
      <Toaster position="top-center" richColors />
      <ParticleEffect />
      <DivineAura />
      
      {/* Disclaimer Ticker */}
      <TickerBanner />
      
      {/* Interactive Floating Controls */}
      <AudioToggle />
      <EmergencyContactToggle />
      
      <Navbar />
      
      <main className="relative z-10 bg-temple-deep overflow-hidden">
        <KalyanotsavaHero />
        
        <SoulfulJourneyVideo />
        
        <div className="section-blend-top" />
        
        <EventGallery />
        <DevotionalQuotes />
        <EventTimeline />
        <WarmlyWelcomed />
        {/* <AboutSection /> */}
        <SevasGuidelines />
        <SocialSection />
        <SponsorCarousel />
        <DevotionalGallery />
        <LocationSection />
        <ParkingSection />
      </main>

      <SiteFooter />
      
      {/* Background radial gradient decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default Index;
