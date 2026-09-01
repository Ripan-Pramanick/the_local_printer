'use client';

import { Printer, PenTool, Layout, FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef(null);

  const services = [
    { icon: Printer, name: 'Large Format Printing' },
    { icon: PenTool, name: 'Laser Cutting' },
    { icon: Layout, name: 'Signage & Boards' },
    { icon: FileText, name: 'Business Cards' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-pill', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm scroll-reveal">
      <h2 className="text-[20px] font-extrabold text-brand-navy mb-6">Services Offered</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((svc, i) => (
          <div key={i} className="service-pill flex items-center gap-3 p-4 rounded-xl border border-brand-border bg-brand-light/50 hover:bg-white hover:border-brand-orange transition-colors">
            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
              <svc.icon className="w-4 h-4 text-brand-orange" />
            </div>
            <span className="text-[13px] font-bold text-brand-navy">{svc.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}