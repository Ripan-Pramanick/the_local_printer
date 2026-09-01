'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageHero({ badge, title, subtitle, buttons, children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out' // Matched the exact smooth easing of the main HeroSection
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      // Added flexbox centering, min-height, and pt-[120px] to prevent header overlap
      className="bg-brand-navy min-h-[80vh] md:min-h-[74vh] pt-[3px] w-full flex flex-col justify-center items-center text-center px-4 pt-[120px] pb-16 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 w-full">
        
        {badge && (
          <span className="hero-elem inline-block px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-brand-orange text-[11px] font-bold tracking-widest uppercase mb-6">
            {badge}
          </span>
        )}
        
        {/* Typography scaled to match the main HeroSection perfectly */}
        <h1 className="hero-elem text-[38px] sm:text-[48px] md:text-[56px] font-extrabold tracking-tight mb-4 leading-[1.15] text-white">
          {title}
        </h1>
        
        {subtitle && (
          <p className="hero-elem text-white/80 text-[15px] md:text-[16px] max-w-[620px] mx-auto mb-8 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
        
        {buttons && (
          <div className="hero-elem flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8 w-full sm:w-auto">
            {buttons}
          </div>
        )}
        
        {children && (
          <div className="hero-elem mt-4 w-full">
            {children}
          </div>
        )}
        
      </div>
    </section>
  );
}