'use client';

import { useState } from 'react';

export default function useUserLocation() {
  const [location, setLocation] = useState(null); // { city, lat, lng, method }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectLocation = async () => {
    setLoading(true);
    setError(null);

    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
     
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
           
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            
           
            const city = data.address.city || data.address.town || data.address.state_district || 'Unknown Location';
            
            setLocation({ city, lat: latitude, lng: longitude, method: 'GPS' });
          } catch (err) {
            setLocation({ city: 'Location Found', lat: latitude, lng: longitude, method: 'GPS' });
          }
          setLoading(false);
        },
        (err) => {
          setError('Please allow location access to find printers near you.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

    } else {
      // ======== PC: IP-Based Location ========
      try {
       
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        if (data.error) throw new Error(data.reason);

        setLocation({
          city: data.city,
          lat: data.latitude,
          lng: data.longitude,
          method: 'IP'
        });
      } catch (err) {
        setError('Could not detect location from IP.');
      } finally {
        setLoading(false);
      }
    }
  };

  return { location, loading, error, detectLocation };
}