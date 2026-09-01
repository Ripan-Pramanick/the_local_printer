'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Structured exactly as shown in the provided design
const keywordCategories = [
  {
    title: 'POPULAR KEYWORDS',
    textColor: 'text-[#FF5722]',
    borderColor: 'border-[#FF5722]',
    items: [
      'Digital Printing', 'Flex Printing', 'ID Cards', 'Lanyard Print', 
      'Business Cards', 'Flyers', 'Letter Heads', 'Display Boards', 
      'PVC File Folder', 'Signage', 'Direct Print on Flat Surface'
    ]
  },
  {
    title: 'CUSTOMIZE PRODUCTS',
    textColor: 'text-[#20C997]',
    borderColor: 'border-[#20C997]',
    items: [
      'Photo Frame', 'Mobile Case', 'Badge Magnet', 'Posters', 
      'Vinyl Cutout', 'Label Stickers', 'Canvas Printing', 'Mobile Skin', 
      'Neon', 'Water Bottle', 'Tote Bags Printing', 'Curtain'
    ]
  },
  {
    title: 'MARKETING MATERIAL',
    textColor: 'text-[#3B82F6]',
    borderColor: 'border-[#3B82F6]',
    items: [
      'Rollup Standee', 'Demo Tent', 'Promo Table', 'Flags'
    ]
  },
  {
    title: 'SEASONAL PRINTING',
    textColor: 'text-[#84CC16]',
    borderColor: 'border-[#84CC16]',
    items: [
      'Wrist Bands', 'Event Backdrops', 'Wall Calendar', 
      'Table Calendar', 'Gifting'
    ]
  },
  {
    title: 'TRENDING MODE',
    textColor: 'text-[#F472B6]',
    borderColor: 'border-[#F472B6]',
    items: [
      'Laser Marking', 'UV DTF Sticker', 'UV Direct Print', 'UV Roll to Roll'
    ]
  }
];

export default function KeywordSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate columns staggering in from the bottom
      gsap.from('.kw-col', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 80%', 
          once: true 
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-navy px-6">
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Header Area matches exact screenshot alignment */}
        <div className="mb-16 relative flex flex-col items-center">
          <div className="w-full lg:absolute lg:top-1 lg:left-0 flex justify-center lg:justify-start mb-6 lg:mb-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-[11px] font-bold tracking-widest uppercase">
              BROWSE & DISCOVER
            </span>
          </div>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-white text-center">
            Find Exactly What You Need
          </h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {keywordCategories.map((category, i) => (
            <div key={i} className="kw-col flex flex-col">
              
              {/* Column Header */}
              <h3 className={`text-[12px] font-bold uppercase tracking-wider mb-2 pb-3 border-b-2 ${category.textColor} ${category.borderColor}`}>
                {category.title}
              </h3>
              
              {/* Keywords List */}
              <ul className="flex flex-col">
                {category.items.map((item, j) => (
                  <li 
                    key={j} 
                    className="py-3 border-b border-white/[0.06] text-[13.5px] font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}