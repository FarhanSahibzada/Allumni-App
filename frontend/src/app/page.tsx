"use client"
import { useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/Stats-section';
import { FeaturesSection } from '@/components/Feature-section';

export default function Page() {
 
  useEffect(() => {
    // Dynamically import Locomotive Scroll and initialize it
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true, 
        multiplier: 2, 
        class: 'is-inview', 
      });

    
      return () => scroll.destroy();
    })();
  }, []);

  return (
    <div >
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
}
