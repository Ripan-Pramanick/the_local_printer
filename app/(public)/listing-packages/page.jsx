'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, Lock } from 'lucide-react';
import Link from 'next/link';

const packageBenefits = [
  'One-time payment only for registration',
  'No free listing — keeps junk data off the platform',
  'Only direct printers, no mediators',
  'Get new resellers for your business',
  "India's first platform built only for your industry",
  'No technical knowledge needed — rank on new keywords in 3 steps',
  'GPS-based hyperlocal platform for instant orders',
  'Improve walk-ins and direct calls',
  "Best and last deal for services you don't offer — via our simplified platform",
  'We do not commit leads — we connect customers to you at the right time for the right order'
];

export default function PackagesPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pkg-animate', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out' 
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    // Changed py-12 to pt-[120px] pb-12 to properly clear the fixed floating header
    <div ref={pageRef} className="min-h-screen bg-[#F7F8FA] pt-[120px] pb-12 px-4 md:px-6 flex justify-center items-start">
      
      <div className="pkg-animate w-full max-w-[1000px]  bg-white rounded-xl shadow-sm border border-brand-border p-8 md:p-14">
        
        <h1 className="text-[22px] font-bold text-brand-navy mb-12">
          Listing Packages
        </h1>

        <div className="max-w-[700px] mx-auto flex flex-col items-center">
          
          <h2 className="pkg-animate text-[26px] md:text-[30px] font-bold text-brand-navy mb-4 text-center tracking-tight">
            Vendor Registration
          </h2>
          
          <p className="pkg-animate text-[14px] md:text-[15px] text-brand-muted text-center mb-10 leading-relaxed">
            List your printing business with a <strong className="font-semibold text-brand-navy">one-time registration payment</strong>. No free listings — this keeps the directory quality high.<br className="hidden md:block"/>
            Users browse and contact printers for free after they <Link href="/register" className="text-brand-orange hover:underline">create an account</Link>.
          </p>

          <div className="pkg-animate w-full max-w-[500px] bg-white rounded-xl border border-brand-border shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden">
            
            <div className="bg-[#1C364F] py-8 px-6 text-center text-white">
              <h3 className="text-[18px] font-bold mb-3">Vendor Registration</h3>
              <div className="flex items-baseline justify-center gap-1.5 mb-2">
                <span className="text-[40px] font-bold tracking-tight leading-none">₹3,000</span>
                <span className="text-[13px] text-white/80 font-medium">one-time</span>
              </div>
              <p className="text-[13px] text-white/70">1 business listing included</p>
            </div>

            <div className="p-6 md:p-8">
              <h4 className="text-[14px] font-bold text-brand-navy mb-4">Package benefits</h4>
              
              <ul className="flex flex-col">
                {packageBenefits.map((benefit, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-3 py-3 border-b border-[#F3F4F6] last:border-0"
                  >
                    <div className="mt-[3px] w-4 h-4 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#22C55E]" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] text-[#4B5563] leading-snug">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-8 bg-[#EA580C] hover:bg-[#D84A06] text-white text-[15px] font-bold py-3.5 rounded-lg transition-colors shadow-sm">
                Pay ₹3,000 & Register
              </button>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF]">
                <Lock className="w-3 h-3 text-[#F59E0B]" />
                <span>Payments secured by Razorpay.</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}