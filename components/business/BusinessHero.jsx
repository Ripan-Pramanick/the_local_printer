'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Star, BadgeCheck, Phone, MessageCircle, Navigation, Mail } from 'lucide-react';

export default function BusinessHero({ business }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-cover', { opacity: 0, duration: 0.8, ease: 'power2.out' })
        .from('.hero-logo', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, "-=0.4")
        .from('.hero-meta', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, "-=0.3")
        .from('.hero-btn', { y: 15, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, "-=0.2");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-white border-b border-brand-border pb-8">
      {/* Cover Image */}
      <div className="hero-cover w-full h-[280px] md:h-[320px] bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent z-10"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20 mb-6">
          
          {/* Logo */}
          <div className="hero-logo w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center shrink-0 overflow-hidden">
            <div className="w-full h-full bg-brand-light flex items-center justify-center text-brand-muted font-bold text-[14px]">
              LOGO
            </div>
          </div>

          {/* Title & Primary Info */}
          <div className="flex-grow pt-4 md:pt-0">
            <div className="hero-meta flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-[12px] font-bold tracking-wider uppercase rounded-full">
                {business.category}
              </span>
              {business.verified && (
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Verified</span>
                </div>
              )}
            </div>
            
            <h1 className="hero-meta text-[28px] md:text-[36px] font-extrabold text-brand-navy leading-tight mb-3">
              {business.name}
            </h1>
            
            <div className="hero-meta flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-brand-muted">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-brand-navy">{business.rating}</span>
                <span>({business.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-5 h-5" />
                <span>{business.location} • <strong className="text-brand-navy">{business.distance} km away</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Strip */}
        <div className="flex flex-wrap items-center gap-3 border-t border-brand-border pt-6">
          <button className="hero-btn h-[44px] px-6 rounded-full bg-brand-navy text-white text-[14px] font-bold hover:bg-[#163554] transition-colors flex items-center gap-2 shadow-sm">
            <Phone className="w-4 h-4" /> Call Now
          </button>
          <button className="hero-btn h-[44px] px-6 rounded-full bg-[#25D366]/10 text-[#1EAA52] border border-[#25D366]/20 text-[14px] font-bold hover:bg-[#25D366]/20 transition-colors flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
          <button className="hero-btn h-[44px] px-6 rounded-full border border-brand-border text-brand-navy text-[14px] font-bold hover:bg-brand-light transition-colors flex items-center gap-2">
            <Navigation className="w-4 h-4 text-brand-muted" /> Get Directions
          </button>
          <button className="hero-btn ml-auto h-[44px] px-6 rounded-full border border-brand-border text-brand-navy text-[14px] font-bold hover:bg-brand-light transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-muted" /> Send Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}