import HeroSection from '@/components/home/HeroSection';

import VisionSection from '@/components/home/VisionSection';
import MaterialSection from '@/components/home/MaterialSection';
import KeywordSection from '@/components/home/KeywordSection';
import HowItWorks from '@/components/home/HowItWorks';
import BusinessCTA from '@/components/home/BusinessCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      
      <VisionSection />
      <MaterialSection />
      <KeywordSection />
      <HowItWorks />
      <BusinessCTA />
    </div>
  );
}