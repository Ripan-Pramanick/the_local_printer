'use client';

import { MapPin, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  
  useEffect(() => {
  
    if (typeof window === 'undefined') return;

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
                
                // শহরের নাম বের করে স্টেটে সেভ করা
                const city = data.address.city || data.address.town || data.address.state_district || '';
                if (city) setLocation(city);
              } catch (err) {
                console.error("Error fetching city name:", err);
              } finally {
                setIsLocating(false);
              }
            },
            (error) => {
              console.error("GPS access denied:", error);
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
          console.error("IP Geolocation failed:", err);
        } finally {
          setIsLocating(false);
        }
      }
    };

    autoDetectLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (query) params.append('q', query);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-full border border-brand-border h-[52px] w-full max-w-[750px] shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-brand-orange/30 focus-within:border-brand-orange overflow-hidden pl-2 pr-1.5"
    >
      {/* Location Input */}
      <div className="flex items-center flex-1 h-full pl-3 bg-transparent">
        <MapPin className={`w-5 h-5 shrink-0 ${isLocating ? 'text-brand-orange animate-pulse' : 'text-brand-muted'}`} />
        <input
          type="text"
          placeholder={isLocating ? "Detecting location..." : "Enter location..."}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full h-full px-3 text-[15px] text-brand-darkText border-none focus:ring-0 focus:outline-none bg-transparent placeholder:text-brand-muted"
        />
      </div>

      {/* Divider */}
      <div className="h-7 w-[1px] bg-brand-border shrink-0 mx-2"></div>

      {/* Query Input */}
      <div className="flex items-center flex-[1.5] h-full bg-transparent">
        <Search className="w-5 h-5 text-brand-muted shrink-0" />
        <input
          type="text"
          placeholder="Business name, tag or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full px-3 text-[15px] text-brand-darkText border-none focus:ring-0 focus:outline-none bg-transparent placeholder:text-brand-muted"
        />
        
        {/* Submit Button */}
        <button
          type="submit"
          className="h-[42px] px-7 bg-brand-orange hover:bg-[#E04812] text-white text-[15px] font-bold rounded-full transition-colors shrink-0 flex items-center gap-2 ml-2"
        >
          <Search className="w-[18px] h-[18px]" />
          Enter
        </button>
      </div>
    </form>
  );
}