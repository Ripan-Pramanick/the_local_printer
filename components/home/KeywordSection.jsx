'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Flame, 
  ShoppingBag, 
  Megaphone, 
  CalendarDays, 
  Star,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const keywordCategories = [
  {
    title: 'POPULAR KEYWORDS',
    icon: Flame,
    colorClass: 'text-[#FF5722]',
    hoverTextClass: 'group-hover/item:text-[#FF5722]',
    bgClass: 'bg-[#FF5722]/10',
    borderClass: 'border-[#FF5722]/30',
    hoverBorderClass: 'group-hover/card:border-[#FF5722]/50',
    hoverShadowClass: 'hover:shadow-[0_8px_30px_-4px_rgba(255,87,34,0.2)]',
    items: [
      'Digital Printing', 'Flex Printing', 'ID Cards', 'Lanyard Print', 
      'Business Cards', 'Flyers', 'Letter Heads', 'Display Boards', 
      'PVC File Folder', 'Signage', 'Direct Print on Flat Surface'
    ]
  },
  {
    title: 'CUSTOMIZE PRODUCTS',
    icon: ShoppingBag,
    colorClass: 'text-[#20C997]',
    hoverTextClass: 'group-hover/item:text-[#20C997]',
    bgClass: 'bg-[#20C997]/10',
    borderClass: 'border-[#20C997]/30',
    hoverBorderClass: 'group-hover/card:border-[#20C997]/50',
    hoverShadowClass: 'hover:shadow-[0_8px_30px_-4px_rgba(32,201,151,0.2)]',
    items: [
      'Photo Frame', 'Mobile Case', 'Badge Magnet', 'Posters', 
      'Vinyl Cutout', 'Label Stickers', 'Canvas Printing', 'Mobile Skin', 
      'Neon', 'Water Bottle', 'Tote Bags Printing', 'Curtain'
    ]
  },
  {
    title: 'MARKETING MATERIAL',
    icon: Megaphone,
    colorClass: 'text-[#3B82F6]',
    hoverTextClass: 'group-hover/item:text-[#3B82F6]',
    bgClass: 'bg-[#3B82F6]/10',
    borderClass: 'border-[#3B82F6]/30',
    hoverBorderClass: 'group-hover/card:border-[#3B82F6]/50',
    hoverShadowClass: 'hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.2)]',
    items: [
      'Rollup Standee', 'Demo Tent', 'Promo Table', 'Flags'
    ]
  },
  {
    title: 'SEASONAL PRINTING',
    icon: CalendarDays,
    colorClass: 'text-[#84CC16]',
    hoverTextClass: 'group-hover/item:text-[#84CC16]',
    bgClass: 'bg-[#84CC16]/10',
    borderClass: 'border-[#84CC16]/30',
    hoverBorderClass: 'group-hover/card:border-[#84CC16]/50',
    hoverShadowClass: 'hover:shadow-[0_8px_30px_-4px_rgba(132,204,22,0.2)]',
    items: [
      'Wrist Bands', 'Event Backdrops', 'Wall Calendar', 
      'Table Calendar', 'Gifting'
    ]
  },
  {
    title: 'TRENDING MODE',
    icon: Star,
    colorClass: 'text-[#F472B6]',
    hoverTextClass: 'group-hover/item:text-[#F472B6]',
    bgClass: 'bg-[#F472B6]/10',
    borderClass: 'border-[#F472B6]/30',
    hoverBorderClass: 'group-hover/card:border-[#F472B6]/50',
    hoverShadowClass: 'hover:shadow-[0_8px_30px_-4px_rgba(244,114,182,0.2)]',
    items: [
      'Laser Marking', 'UV DTF Sticker', 'UV Direct Print', 'UV Roll to Roll'
    ]
  }
];

export default function KeywordSection() {
  const sectionRef = useRef(null);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.kw-card', 
        {
          opacity: 0,
          y: 40,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 85%', 
            once: true 
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section ref={sectionRef} className="py-24 bg-brand-navy px-4 md:px-6">
      <div className="max-w-screen-xl mx-auto bg-white/[0.02] backdrop-blur-md rounded-[22px] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] p-8 md:p-12 relative overflow-hidden transition-all duration-500">
        
        <div className="mb-14 relative flex flex-col items-center">
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              BROWSE & DISCOVER
            </span>
          </div>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-white text-center tracking-tight leading-tight">
            Find Exactly What You Need
          </h2>
          <p className="text-[15px] text-white/60 text-center mt-4 max-w-xl">
            Explore categories to discover the perfect printing solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-start">
          {keywordCategories.map((category, i) => {
            const Icon = category.icon;
            const isExpanded = expandedCards[i];
            const displayItems = isExpanded ? category.items : category.items.slice(0, 5);
            const hasMore = category.items.length > 5;

            return (
              <div 
                key={i} 
                className={`kw-card opacity-0 flex flex-col h-fit bg-white/[0.04] rounded-2xl border border-white/5 p-6 transition-all duration-300 hover:-translate-y-1 group/card ${category.hoverShadowClass} ${category.hoverBorderClass}`}
              >
                
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto shrink-0 ${category.bgClass}`}>
                  <Icon className={`w-6 h-6 ${category.colorClass}`} strokeWidth={2} />
                </div>
                
                <h3 className={`text-[13px] font-extrabold uppercase tracking-wider text-center mb-5 pb-5 border-b shrink-0 ${category.colorClass} ${category.borderClass}`}>
                  {category.title}
                </h3>
                
                <ul className="flex flex-col">
                  {displayItems.map((item, j) => (
                    <li 
                      key={j} 
                      className="flex items-center justify-between py-3 border-b border-white/[0.04] text-[14px] font-medium text-white/70 group/item hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="transition-colors group-hover/item:text-white truncate pr-2">
                        {item}
                      </span>
                      <ChevronRight className={`w-4 h-4 shrink-0 text-white/20 transition-all duration-300 group-hover/item:translate-x-1 ${category.hoverTextClass}`} />
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-2 flex justify-center shrink-0">
                  {hasMore ? (
                    <button 
                      onClick={() => toggleExpand(i)}
                      className={`inline-flex items-center gap-2 text-[14px] font-bold transition-all duration-300 hover:brightness-125 hover:gap-3 ${category.colorClass}`}
                    >
                      {isExpanded ? 'View Less' : 'View All'} 
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`} />
                    </button>
                  ) : (
                    <div className="h-[24px]"></div>
                  )}
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}