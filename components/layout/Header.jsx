'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../navigation/SearchBar';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation'; 

export default function Header() {
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-4 left-0 w-full z-50 px-4 md:px-6 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full h-[65px] max-w-screen-xl mx-auto px-6 rounded-2xl bg-white/75 backdrop-blur-md shadow-lg border border-brand-border/50 flex items-center justify-between gap-8 transition-all">
        
        {/* Logo Area */}
        <Link href="/" className="shrink-0">
          <div className="flex items-center gap-2.5">
             <Image src="/logo.webp" alt="Logo" width={160} height={160} />
          </div>
        </Link>

        {/* Global Search */}
        <div className="hidden lg:flex flex-grow justify-center max-w-[740px] px-4">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2 shrink-0 text-[16px] font-bold">
          <Link 
            href="/about" 
            className={`px-4 py-2 rounded-xl transition-colors ${
              pathname === '/about' 
                ? 'bg-brand-orange/10 text-brand-orange' // Active State
                : 'text-brand-navy hover:bg-brand-orange/10 hover:text-brand-orange' // Default & Hover State
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`px-4 py-2 rounded-xl transition-colors ${
              pathname === '/contact' 
                ? 'bg-brand-orange/10 text-brand-orange' // Active State
                : 'text-brand-navy hover:bg-brand-orange/10 hover:text-brand-orange' // Default & Hover State
            }`}
          >
            Contact
          </Link>
          <Link 
            href="/login" 
            className="ml-2 px-6 py-2 rounded-xl border border-brand-border text-brand-navy hover:border-brand-navy hover:bg-brand-light transition-colors bg-white/50"
          >
            Login
          </Link>
        </nav>

      </div>
    </header>
  );
}