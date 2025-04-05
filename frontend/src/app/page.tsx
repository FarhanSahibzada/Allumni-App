// "use client"
// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import  Loading  from "../components/Loading"
// import { HeroSection } from '@/components/HeroSection';
// import { StatsSection } from '@/components/Stats-section';
// import LocomotiveScroll from 'locomotive-scroll';

// export default function Page() {
//   const router = useRouter();
//   const locomotive  = new LocomotiveScroll();

 
//   return(
//     <>
//     <HeroSection />
//     <StatsSection />
//     </>
//   )
// }

"use client"
import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/Stats-section';
import { FeaturesSection } from '@/components/Feature-section';

export default function Page() {
  // useEffect(() => {
  //   const locomotive = new LocomotiveScroll({
  //     el: document.querySelector('.scroll-container'), // Ensure you have a container to apply the scroll
  //     smooth: true,
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     locomotive.destroy();
  //   };
  // }, []); // Empty dependency array means this runs once after component mounts

  return (
    <div className="scroll-container">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
}
