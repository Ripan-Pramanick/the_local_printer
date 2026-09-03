'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../navigation/SearchBar';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation'; 
import { Menu, X, MapPin, Search, Crosshair, Loader2 } from 'lucide-react';

export default function Header() {
  const headerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  const [locationInput, setLocationInput] = useState('');
  const [isLocating, setIsLocating] = useState(false);

 
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true); 

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

       
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.county;
          
          if (city) {
            setLocationInput(city);
          } else {
            setLocationInput('Location Found');
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
          alert("Could not fetch location name.");
        } finally {
          setIsLocating(false); 
        }
      },
      (error) => {
        setIsLocating(false);
        alert('Location access denied. Please type your city.');
      }
    );
  };

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-4 left-0 w-full z-40 px-4 md:px-6 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full h-[65px] max-w-screen-xl mx-auto px-4 lg:px-6 rounded-2xl bg-white/75 backdrop-blur-md shadow-lg border border-brand-border/50 flex items-center justify-between gap-8 transition-all">
          
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2.5">
               <Image 
                 src="/logo.webp" 
                 alt="Logo" 
                 width={160} 
                 height={40} 
                 className="w-[130px] md:w-[160px] h-auto" 
               />
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-grow justify-center max-w-[740px] px-4">
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 shrink-0 text-[16px] font-bold">
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-xl transition-colors ${
                pathname === '/about' ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-navy hover:bg-brand-orange/10 hover:text-brand-orange'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2 rounded-xl transition-colors ${
                pathname === '/contact' ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-navy hover:bg-brand-orange/10 hover:text-brand-orange'
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

          <button 
            className="lg:hidden p-2 text-brand-navy hover:text-brand-orange transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[50] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[60] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-brand-border/50">
          <Image src="/logo.webp" alt="Logo" width={130} height={35} className="h-auto" />
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full bg-brand-light text-brand-muted hover:text-brand-orange transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Mobile Stacked Search */}
          <div className="w-full flex flex-col gap-2.5 p-4 bg-[#F7F8FA] rounded-2xl border border-brand-border">
            
            <div className="flex items-center bg-white p-2 rounded-xl relative">
              <MapPin className="w-[18px] h-[18px] text-brand-orange shrink-0 ml-1.5 mr-2.5" />
              <input 
                type="text" 
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder={isLocating ? "Detecting..." : "Enter location..."} 
                className="w-full text-[14px] bg-transparent outline-none border-none focus:ring-0 p-0 text-brand-navy font-medium placeholder:font-normal placeholder:text-gray-400" 
              />
              <button 
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center shrink-0 transition-all ml-1 active:scale-95 cursor-pointer z-10 disabled:opacity-50"
              >
                {isLocating ? (
                  <Loader2 className="w-[18px] h-[18px] text-brand-orange animate-spin" />
                ) : (
                  <Crosshair className="w-[18px] h-[18px] text-brand-navy opacity-60 hover:opacity-100 pointer-events-none" />
                )}
              </button>
            </div>
            
            <div className="flex items-center bg-white p-2 rounded-xl">
              <Search className="w-[18px] h-[18px] text-brand-orange shrink-0 ml-1.5 mr-2.5" />
              <input 
                type="text" 
                placeholder="Search printers..." 
                className="w-full h-9 text-[14px] bg-transparent outline-none border-none focus:ring-0 p-0 text-brand-navy font-medium placeholder:font-normal placeholder:text-gray-400" 
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push(`/search?loc=${locationInput}`);
              }}
              className="w-full bg-[#EA580C] hover:bg-[#D84A06] text-white py-3 rounded-xl font-bold text-[14px] mt-2 transition-colors shadow-sm active:scale-[0.98]"
            >
              Search
            </button>
          </div>

          <nav className="flex flex-col gap-3 text-[16px] font-bold">
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="p-4 rounded-xl text-brand-navy bg-brand-light/50 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="p-4 rounded-xl text-brand-navy bg-brand-light/50 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-brand-border/50">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full py-4 rounded-xl border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors font-bold text-[16px]">
            Login / Register
          </Link>
        </div>
      </div>
    </>
  );
}