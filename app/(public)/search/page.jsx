'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  SlidersHorizontal, 
  MapPin, 
  Briefcase, 
  Search, 
  Crosshair, 
  X
} from 'lucide-react';

export default function SearchPage() {
  const containerRef = useRef(null);
  const [showAlert, setShowAlert] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const autoDetectLocation = async () => {
    setIsLocating(true);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
              const data = await res.json();
              const city = data.address.city || data.address.town || data.address.state_district || '';
              if (city) setLocation(city);
            } catch (err) {
              console.error(err);
            } finally {
              setIsLocating(false);
            }
          },
          (error) => {
            setIsLocating(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setIsLocating(false);
      }
    } else {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.city) {
          setLocation(data.city);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLocating(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      autoDetectLocation();
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.search-top-block', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' });
      tl.from('.results-header', { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' }, "-=0.3");
      tl.from('.empty-state', { y: 20, opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.out' }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F7F8FA] min-h-screen pt-[120px] pb-12 px-4 md:px-6 flex flex-col items-center">
      <div className="max-w-screen-xl w-full flex flex-col items-center">
        
        <div className="search-top-block w-full flex flex-col items-center mb-10">
          
          <div className="flex flex-col md:flex-row items-center w-full max-w-[900px] border border-gray-200 rounded-2xl md:rounded-full bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-brand-orange/40 transition-all">
            
            <div className="flex-1 flex items-center px-6 h-[64px] w-full relative group">
              <MapPin className={`w-5 h-5 mr-4 shrink-0 ${isLocating ? 'text-brand-orange animate-pulse' : 'text-brand-orange'}`} />
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Location</span>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={isLocating ? "Detecting location..." : "City, area or Near Me..."}
                  className="w-full text-[15px] text-brand-navy font-semibold outline-none placeholder:font-normal placeholder:text-gray-400 bg-transparent p-0 border-none focus:ring-0"
                />
              </div>
              <button 
                onClick={autoDetectLocation}
                type="button"
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center shrink-0 transition-colors"
              >
                <Crosshair className={`w-[18px] h-[18px] transition-all ${isLocating ? 'text-brand-orange opacity-100 animate-spin' : 'text-brand-navy opacity-60 hover:opacity-100'}`} />
              </button>
            </div>

            <div className="hidden md:block w-[1px] h-[40px] bg-gray-200 shrink-0"></div>
            <div className="block md:hidden w-full h-[1px] bg-gray-100"></div>

            <div className="flex-1 flex items-center pl-6 pr-2 h-[64px] w-full">
              <Briefcase className="w-5 h-5 text-brand-orange mr-4 shrink-0" />
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Search Printers</span>
                <input 
                  type="text" 
                  placeholder="e.g. banner, DTF, visiting cards..."
                  className="w-full text-[15px] text-brand-navy font-semibold outline-none placeholder:font-normal placeholder:text-gray-400 bg-transparent p-0 border-none focus:ring-0"
                />
              </div>
              
              <button className="h-[52px] w-[52px] md:w-[70px] bg-[#EA580C] hover:bg-[#D84A06] rounded-xl md:rounded-full flex items-center justify-center text-white shrink-0 transition-colors shadow-sm ml-2">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 items-start w-full max-w-[900px]">
            <div className="bg-[#FCE7F3] text-[#BE123C] px-4 py-2 rounded-lg text-[13px] font-medium border border-[#FBCFE8]">
              Location denied. Please type your city.
            </div>
            
            {showAlert && (
              <div className="w-full flex items-start sm:items-center justify-between bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] px-4 py-3 rounded-lg text-[13px] font-medium shadow-sm">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#EF4444] shrink-0" />
                  <span>
                    Location access blocked — type your city or <a href="#" className="underline hover:text-[#B45309]">allow in browser settings</a>
                  </span>
                </div>
                <button onClick={() => setShowAlert(false)} className="text-[#B45309] hover:text-[#78350F] ml-4 shrink-0 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center w-full max-w-[900px]">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 text-[13px] font-extrabold transition-all duration-300 bg-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg ${showFilters ? 'text-brand-orange' : 'text-brand-navy hover:text-brand-orange'}`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
              Filters & Radius
            </button>
          </div>

          <div 
            className={`w-full max-w-[900px] grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${
              showFilters ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  
                  <div className="flex flex-col">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-4">Radius: 5 KM</label>
                    <div className="relative w-full h-1 bg-gray-200 rounded-full mt-2">
                      <div className="absolute top-0 left-0 h-full bg-brand-orange rounded-full" style={{ width: '20%' }}></div>
                      <div className="absolute top-1/2 left-[20%] w-4 h-4 bg-brand-orange rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow"></div>
                      <span className="absolute top-6 left-[20%] -translate-x-1/2 text-[12px] font-bold text-brand-orange">5</span>
                    </div>
                  </div>

                  {[
                    { label: 'Category', value: 'All Categories' },
                    { label: 'Name', value: 'Default (nearest)' },
                    { label: 'Rating (Minimum)', value: 'Any rating' },
                    { label: 'Service', value: 'All services' },
                    { label: 'Order', value: 'All order types' },
                    { label: 'Deal With', value: 'B2B, B2C & both' },
                    { label: 'Orders Limit', value: 'Any' },
                  ].map((filter, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">{filter.label}</label>
                      <select className="w-full appearance-none bg-white border-none p-0 text-[14px] text-brand-navy focus:ring-0 cursor-pointer font-medium border-b border-transparent hover:border-gray-200 py-1 transition-colors">
                        <option>{filter.value}</option>
                      </select>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[900px] flex flex-col">
          
          <div className="results-header flex justify-between items-end border-b border-gray-200 pb-4 mb-16">
            <div className="flex flex-col">
              <h2 className="text-[18px] md:text-[22px] font-extrabold text-brand-navy">0 results found</h2>
              <p className="text-[13px] text-gray-400 font-medium">within 5 km of Chamoli Tehsil</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-400 font-medium">Sort:</span>
              <select className="bg-white border border-gray-200 text-brand-navy text-[13px] font-bold rounded-lg px-3 py-1.5 focus:ring-0 outline-none cursor-pointer">
                <option>Nearest first</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="empty-state flex flex-col items-center justify-center text-center py-10">
            <div className="w-[60px] h-[60px] mb-6 flex items-center justify-center opacity-40">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1F466B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            
            <h3 className="text-[20px] font-extrabold text-brand-navy mb-2">No businesses found nearby</h3>
            <p className="text-[15px] text-gray-400 font-medium mb-8">Try expanding the radius or adjusting your search.</p>
            
            <button className="bg-[#1C364F] hover:bg-[#122538] text-white px-7 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-md">
              Expand to 10 km and retry
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}