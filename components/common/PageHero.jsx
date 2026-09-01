'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageHero({ badge, title, subtitle, buttons, children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-brand-navy pt-20 pb-16 px-6 text-center text-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {badge && (
          <span className="hero-elem inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-[11px] font-bold tracking-widest uppercase mb-6 border border-brand-orange/20">
            {badge}
          </span>
        )}
        <h1 className="hero-elem text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="hero-elem text-white/80 text-[16px] leading-relaxed mb-8 max-w-2xl">
            {subtitle}
          </p>
        )}
        {buttons && (
          <div className="hero-elem flex flex-wrap justify-center gap-4">
            {buttons}
          </div>
        )}
        {children && <div className="hero-elem mt-8 w-full">{children}</div>}
      </div>
    </section>
  );
}