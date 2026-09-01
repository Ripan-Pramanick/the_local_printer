'use client';

import SectionHeader from '../common/SectionHeader';
import { ShieldCheck, MapPin, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const visions = [
  { icon: MapPin, title: 'Convenient', desc: 'Connecting you to instant printing solutions from nearby businesses.' },
  { icon: CheckCircle2, title: 'Accessible', desc: 'Get 30 minutes searchable access to every verified printer in India.' },
  { icon: Zap, title: 'Effortless', desc: 'Find, compare, and order from anywhere in the country with a single platform.' },
  { icon: ShieldCheck, title: 'Secure & safe', desc: 'Strict verification and ranking rules mean results are reliable and trustworthy.' },
];

export default function VisionSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vision-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true }
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-brand-light px-6">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeader 
          title="The Local Printer Vision" 
          subtitle="Everything you need to find, connect, and work with the best printing businesses near you."
        />
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visions.map((item, i) => (
            <div key={i} className="vision-card bg-white p-8 rounded-2xl shadow-sm border border-brand-border/50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-[18px] font-bold text-brand-navy mb-3">{item.title}</h3>
              <p className="text-[14px] text-brand-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}