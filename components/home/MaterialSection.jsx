'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Using standard, widely supported Lucide icons to prevent render crashes
import { 
  FileText, Shirt, Smartphone, Coffee, Package, Droplets, Diamond, Building2, PaintRoller, 
  File, Milk, Flame, Inbox, Grip, Tag, Ruler, Wrench, PenTool, Box, Square, Waves, X, 
  StickyNote, Type, FileBadge, Medal, Umbrella, Palette 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 28 exact items mapped to safe icons
const materialsData = [
  { name: 'Paper', icon: FileText },
  { name: 'T-shirt / Fabric', icon: Shirt },
  { name: 'Mobile Skins', icon: Smartphone },
  { name: 'Mug', icon: Coffee },
  { name: 'Pouch', icon: Package },
  { name: 'Water Bottle', icon: Droplets },
  { name: 'Acrylic', icon: Diamond },
  { name: 'ACP', icon: Building2 },
  { name: 'Canvas', icon: PaintRoller },
  { name: 'Card', icon: File },
  { name: 'Dairy Packaging', icon: Milk },
  { name: 'Flex / Vinyl', icon: Flame },
  { name: 'Foam Board', icon: Inbox },
  { name: 'Frosted Glass', icon: Grip },
  { name: 'Labels', icon: Tag },
  { name: 'MDF', icon: Ruler },
  { name: 'Metal', icon: Wrench },
  { name: 'Pen', icon: PenTool },
  { name: 'Plastic', icon: Box },
  { name: 'Rexine', icon: Square },
  { name: 'Satin', icon: Waves },
  { name: 'SS Steel', icon: X },
  { name: 'Sticker', icon: StickyNote }, 
  { name: 'Texture', icon: Type }, 
  { name: 'Tiles', icon: FileBadge }, 
  { name: 'Trophy', icon: Medal },
  { name: 'Umbrella', icon: Umbrella },
  { name: 'Vinyl', icon: Palette },
];

export default function MaterialSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Header Text Animation
      gsap.fromTo('.mat-header-elem', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true }
        }
      );

      // Grid Cards Animation (Fixed to ensure they become visible)
      gsap.fromTo('.material-card', 
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // bg-[#F7F8FA] matching the specific off-white/light-grey background from your image
    <section ref={sectionRef} className="py-24 bg-[#F7F8FA] px-6">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Left Aligned Header exactly like the screenshot */}
        <div className="flex flex-col items-start text-left mb-12">
          <span className="mat-header-elem inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-[11px] font-bold tracking-widest uppercase mb-5 border border-brand-orange/10">
            PRINT ON
          </span>
          <h2 className="mat-header-elem text-[32px] md:text-[42px] font-extrabold text-brand-navy tracking-tight mb-4">
            Every Material. Every Format.
          </h2>
          <p className="mat-header-elem text-[15px] text-brand-muted leading-relaxed max-w-2xl">
            From everyday paper to specialty surfaces — find printers who work with any substrate.
          </p>
        </div>

        {/* 9-Column Grid Array Mapping */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-4">
          {materialsData.map((mat, i) => {
            const Icon = mat.icon;
            return (
              <div 
                key={i} 
                className="material-card opacity-0 flex flex-col items-center justify-center p-4 h-[110px] bg-white border border-[#E5E7EB] rounded-2xl hover:border-brand-orange hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer text-center group"
              >
                <Icon className="w-6 h-6 text-brand-navy mb-3 group-hover:text-brand-orange transition-colors" strokeWidth={1.5} />
                <span className="text-[11.5px] font-semibold text-brand-navy leading-tight group-hover:text-brand-orange transition-colors">
                  {mat.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}