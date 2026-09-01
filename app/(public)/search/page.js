'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FilterSidebar from '@/components/directory/FilterSidebar';
import BusinessCard from '@/components/directory/BusinessCard';
import { SlidersHorizontal } from 'lucide-react';

import { businesses } from '@/lib/mock-data/businesses';

export default function SearchPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.filter-sidebar', { x: -30, opacity: 0, duration: 0.6, ease: 'power2.out' });
      tl.from('.search-controls', { y: -20, opacity: 0, duration: 0.4, ease: 'power2.out' }, "-=0.4");
      tl.from('.business-card-wrap', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-brand-light min-h-screen py-10 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8">
        
        <div className="filter-sidebar hidden lg:block w-full lg:w-[300px] shrink-0">
          <FilterSidebar />
        </div>

        <div className="flex-1">
          <div className="search-controls flex justify-between mb-8 pb-4 border-b border-brand-border">
            <h1 className="text-[24px] font-extrabold text-brand-navy">
              Found <span className="text-brand-orange">{businesses.length} Printers</span> nearby
            </h1>
            {/* Sort Dropdown */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business.id} className="business-card-wrap h-full">
                <BusinessCard business={business} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}