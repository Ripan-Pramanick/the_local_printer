'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  SlidersHorizontal, 
  MapPin, 
  Search, 
  Crosshair, 
  X,
  ChevronDown
} from 'lucide-react';

const CustomDropdown = ({ value, onChange, options, placeholder = "Select...", minWidth = "min-w-[220px]", align = "left", direction = "down" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${isOpen ? 'z-[60]' : 'z-40'}`} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-[13px] lg:text-[14px] text-brand-navy font-semibold outline-none bg-transparent p-0 border-none cursor-pointer flex justify-between items-center group"
      >
        <span className="truncate pr-4 select-none">{value || placeholder}</span>
        <ChevronDown className={`w-[18px] h-[18px] text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-orange' : 'group-hover:text-brand-orange'}`} />
      </div>
      
      <div 
        className={`absolute ${direction === 'up' ? 'bottom-[130%]' : 'top-[130%]'} ${align === 'right' ? 'right-0' : 'left-0'} ${minWidth} bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 py-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'opacity-100 visible translate-y-0' : `opacity-0 invisible ${direction === 'up' ? 'translate-y-[15px]' : '-translate-y-[15px]'}`}`}
      >
        {options.map((opt, i) => (
          <div 
            key={i}
            onClick={() => { onChange(opt); setIsOpen(false); }}
            className="relative block py-3 pr-5 text-[14px] font-semibold text-brand-navy transition-all duration-300 hover:bg-brand-orange/5 hover:text-brand-orange cursor-pointer group/item pl-5 hover:pl-8"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-brand-orange transition-all duration-300 ease-out group-hover/item:h-[60%] rounded-r-md"></div>
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SearchPage() {
  const containerRef = useRef(null);
  
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');
  const [quantity, setQuantity] = useState('');
  const [service, setService] = useState('');
  const [purpose, setPurpose] = useState('');
  const [sort, setSort] = useState('Nearest first');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterName, setFilterName] = useState('Default (nearest)');
  const [filterRating, setFilterRating] = useState('Any rating');
  const [filterService, setFilterService] = useState('All services');
  const [filterOrder, setFilterOrder] = useState('All order types');
  const [filterDeal, setFilterDeal] = useState('B2B, B2C & both');
  const [filterLimit, setFilterLimit] = useState('Any');
  const [isLocating, setIsLocating] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false); 
  const [showAlert, setShowAlert] = useState(false); 
  const [showFilters, setShowFilters] = useState(true);

  const detectLocationOnDemand = () => {
    setIsLocating(true);
    setLocationDenied(false); 
    setShowAlert(false); 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.state_district || '';
            if (city) setLocation(city);
            
            setLocationDenied(false); 
            setShowAlert(false);
          } catch (err) {
            console.warn(err);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.warn(error.message);
          setLocationDenied(true);
          setShowAlert(true);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Location access requires a secure connection (HTTPS).");
      setIsLocating(false);
    }
  };

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
          
          <div className="flex flex-col xl:flex-row items-center w-full max-w-[1300px] border border-gray-200 rounded-[2rem] xl:rounded-full bg-white shadow-xl shadow-brand-navy/5 p-2 transition-all">
            
            <div className="flex-1 flex items-center px-4 py-2 w-full hover:bg-gray-50 rounded-t-[1.5rem] xl:rounded-full transition-colors relative group">
              <MapPin className={`w-[22px] h-[22px] mr-3 shrink-0 ${isLocating ? 'text-brand-orange animate-pulse' : 'text-brand-orange'}`} />
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Location</span>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={isLocating ? "Detecting..." : "City or Near Me..."}
                  className="w-full text-[14px] text-brand-navy font-semibold outline-none placeholder:font-normal placeholder:text-gray-400 bg-transparent p-0 border-none focus:ring-0"
                />
              </div>
              <button 
                onClick={detectLocationOnDemand}
                type="button"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-brand-orange hover:bg-brand-orange/5 flex items-center justify-center shrink-0 transition-colors shadow-sm"
              >
                <Crosshair className={`w-[16px] h-[16px] transition-all ${isLocating ? 'text-brand-orange opacity-100 animate-spin' : 'text-brand-navy opacity-70'}`} />
              </button>
            </div>

            <div className="hidden xl:block w-[1px] h-10 bg-gray-200 shrink-0"></div>
            <div className="block xl:hidden w-full h-[1px] bg-gray-100"></div>

            <div className="flex-1 flex items-center px-4 py-2 w-full hover:bg-gray-50 xl:rounded-full transition-colors">
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Keyword</span>
                <input 
                  type="text" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. banner, DTF, mug..."
                  className="w-full text-[14px] text-brand-navy font-semibold outline-none placeholder:font-normal placeholder:text-gray-400 bg-transparent p-0 border-none focus:ring-0"
                />
              </div>
            </div>

            <div className="hidden xl:block w-[1px] h-10 bg-gray-200 shrink-0"></div>
            <div className="block xl:hidden w-full h-[1px] bg-gray-100"></div>

            <div className="flex-1 flex items-center px-4 py-2 w-full hover:bg-gray-50 xl:rounded-full transition-colors relative group">
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Quantity</span>
                <CustomDropdown 
                  value={quantity} 
                  onChange={setQuantity} 
                  options={['Single', 'Minimum', 'Bulk', 'No Limit']} 
                />
              </div>
            </div>

            <div className="hidden xl:block w-[1px] h-10 bg-gray-200 shrink-0"></div>
            <div className="block xl:hidden w-full h-[1px] bg-gray-100"></div>

            <div className="flex-[1.2] flex items-center px-4 py-2 w-full hover:bg-gray-50 xl:rounded-full transition-colors relative group">
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">Service</span>
                <CustomDropdown 
                  value={service} 
                  onChange={setService} 
                  options={['Print only', 'Full Fledge with design', 'Full Fledge without design']} 
                  minWidth="min-w-[260px]"
                />
              </div>
            </div>

            <div className="hidden xl:block w-[1px] h-10 bg-gray-200 shrink-0"></div>
            <div className="block xl:hidden w-full h-[1px] bg-gray-100"></div>

            <div className="flex-[1.2] flex items-center pl-4 pr-2 py-2 w-full hover:bg-gray-50 rounded-b-[1.5rem] xl:rounded-full transition-colors relative group">
              <div className="flex flex-col justify-center w-full">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">For</span>
                <CustomDropdown 
                  value={purpose} 
                  onChange={setPurpose} 
                  options={['Personal Use', 'Business Purpose', 'Reselling']} 
                  minWidth="min-w-[200px]"
                />
              </div>
              
              <button className="h-[52px] w-full xl:w-auto xl:px-8 bg-[#EA580C] hover:bg-[#D84A06] rounded-xl xl:rounded-full flex items-center justify-center text-white shrink-0 transition-colors shadow-md ml-3">
                <Search className="w-5 h-5 xl:mr-2" />
                <span className="hidden xl:block font-bold text-[15px]">Search</span>
              </button>
            </div>

          </div>

          <div className="mt-5 flex flex-col gap-3 items-center w-full max-w-[1300px]">
            {locationDenied && (
              <div className="bg-[#FCE7F3] text-[#BE123C] px-5 py-2.5 rounded-xl text-[13px] font-bold border border-[#FBCFE8] shadow-sm">
                Location denied. Please type your city manually.
              </div>
            )}
            
            {locationDenied && showAlert && (
              <div className="w-full max-w-[600px] flex items-start sm:items-center justify-between bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] px-5 py-3.5 rounded-xl text-[13px] font-medium shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#EF4444] shrink-0" />
                  <span>
                    Location access blocked — type your city or{' '}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        detectLocationOnDemand();
                      }} 
                      className="font-bold underline hover:text-[#B45309] focus:outline-none"
                    >
                      allow in browser settings
                    </button>
                  </span>
                </div>
                <button onClick={() => setShowAlert(false)} className="text-[#B45309] hover:text-[#78350F] ml-4 shrink-0 p-1 bg-[#FDE68A]/50 rounded-full hover:bg-[#FDE68A]">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center w-full max-w-[1300px]">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2.5 text-[14px] font-extrabold transition-all duration-300 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-100 ${showFilters ? 'text-brand-orange border-brand-orange/20' : 'text-brand-navy hover:text-brand-orange'}`}
            >
              <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={2.5} />
              Filters & Radius
            </button>
          </div>

          <div 
            className={`w-full max-w-[1300px] grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${
              showFilters ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="w-full bg-white border border-gray-200 rounded-3xl px-6 md:px-8 pt-8 pb-32 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  
                  <div className="flex flex-col">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-4">Radius: 5 KM</label>
                    <div className="relative w-full h-1.5 bg-gray-100 rounded-full mt-2">
                      <div className="absolute top-0 left-0 h-full bg-brand-orange rounded-full" style={{ width: '20%' }}></div>
                      <div className="absolute top-1/2 left-[20%] w-5 h-5 bg-brand-orange rounded-full -translate-x-1/2 -translate-y-1/2 border-[3px] border-white shadow-md cursor-grab active:cursor-grabbing"></div>
                      <span className="absolute top-6 left-[20%] -translate-x-1/2 text-[12px] font-bold text-brand-orange">5</span>
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Category</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterCategory} onChange={setFilterCategory} options={['All Categories', 'Offset', 'Digital', 'Screen']} />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Name</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterName} onChange={setFilterName} options={['Default (nearest)', 'A to Z', 'Z to A']} />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Rating (Minimum)</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterRating} onChange={setFilterRating} options={['Any rating', '4 Stars & up', '3 Stars & up']} />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Service</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterService} onChange={setFilterService} options={['All services', 'Print only', 'Design & Print']} direction='up' />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Order</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterOrder} onChange={setFilterOrder} options={['All order types', 'Single', 'Bulk']} direction='up' />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Deal With</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterDeal} onChange={setFilterDeal} options={['B2B, B2C & both', 'B2B only', 'B2C only']} direction="up" />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider mb-2">Orders Limit</label>
                    <div className="border-b border-gray-100 hover:border-gray-300 py-1.5 transition-colors">
                      <CustomDropdown value={filterLimit} onChange={setFilterLimit} options={['Any', 'No Limit', 'Specific limit']} direction="up" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1300px] flex flex-col mt-8">
          
          <div className="results-header flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-200 pb-5 mb-12 gap-4">
            <div className="flex flex-col">
              <h2 className="text-[20px] md:text-[24px] font-extrabold text-brand-navy">0 results found</h2>
              <p className="text-[14px] text-gray-500 font-medium mt-1">within 5 km of your location</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">Sort:</span>
              <div className="w-[180px] bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-2 py-1 shadow-sm transition-colors">
                <CustomDropdown 
                  value={sort} 
                  onChange={setSort} 
                  options={['Nearest first', 'Highest Rated']} 
                  align="right"
                />
              </div>
            </div>
          </div>

          <div className="empty-state flex flex-col items-center justify-center text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-[72px] h-[72px] mb-6 flex items-center justify-center bg-gray-50 rounded-full">
              <Search className="w-8 h-8 text-gray-300" strokeWidth={2.5} />
            </div>
            
            <h3 className="text-[22px] font-extrabold text-brand-navy mb-2">No businesses found nearby</h3>
            <p className="text-[15px] text-gray-500 font-medium mb-8 max-w-[400px]">Try expanding the radius or adjusting your search filters to find what you're looking for.</p>
            
            <button className="bg-[#1C364F] hover:bg-[#122538] text-white px-8 py-3.5 rounded-full font-bold text-[14px] transition-all shadow-md hover:shadow-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Expand to 10 km and retry
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}