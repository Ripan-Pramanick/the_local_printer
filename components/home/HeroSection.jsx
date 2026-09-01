'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  MapPin, 
  Briefcase, 
  Printer, 
  Layers, 
  Scissors, 
  Box, 
  Palette 
} from 'lucide-react';
import Link from 'next/link';
import StatsStrip from '@/components/home/StatsStrip';

const categories = [
  { name: 'Digital Printing', icon: Printer, href: '/categories/digital-printing' },
  { name: 'DTF / DTG', icon: Layers, href: '/categories/dtf-dtg' },
  { name: 'Laser Cutting', icon: Scissors, href: '/categories/laser-cutting' },
  { name: '3D Printing', icon: Box, href: '/categories/3d-printing' },
  { name: 'Graphic Design', icon: Palette, href: '/categories/graphic-design' },
];

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      
      className="bg-brand-navy min-h-[calc(100vh-84px)] w-full flex flex-col justify-center items-center text-center px-4 relative overflow-hidden pb-[120px]"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 w-full">
        
        {/* Main Heading */}
        <h1 className="hero-element text-[38px] sm:text-[48px] md:text-[56px] font-extrabold text-white tracking-tight mb-4 leading-[1.15]">
          Find <span className="text-brand-orange">Local Printers</span><br />
          & <span className="text-brand-orange">Designers</span> Near You
        </h1>
        
        {/* Subtitle */}
        <p className="hero-element text-white/80 text-[15px] md:text-[16px] max-w-[620px] mx-auto mb-8 font-normal leading-relaxed">
          Connecting you to instant printing solutions from nearby verified<br className="hidden sm:inline" /> 
          {' '}businesses — fast, effortless, and cost-effective.
        </p>

        {/* Action Buttons */}
        <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 w-full sm:w-auto">
          <Link
            href="/search"
            className="w-full sm:w-auto h-[48px] px-7 rounded-full bg-brand-orange text-white text-[14px] font-semibold hover:bg-[#E04812] transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            Find Printers Near Me
          </Link>

          <Link 
            href="/register?type=business" 
            className="w-full sm:w-auto h-[48px] px-7 rounded-full bg-white/[0.05] border border-white/20 text-white text-[14px] font-semibold hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            List My Business
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="hero-element flex flex-wrap justify-center items-center gap-2.5 max-w-3xl">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/90 text-[13px] font-medium hover:bg-white/[0.12] hover:border-white/25 hover:text-white transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Full-width Stats Strip placed at the absolute bottom of the Hero screen */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <StatsStrip />
      </div>
    </section>
  );
}