import { Clock, MapPin, Globe, Phone } from 'lucide-react';

export default function BusinessInfoSidebar({ business }) {
  return (
    <div className="space-y-6">
      
      {/* Contact Card */}
      <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm scroll-reveal">
        <h3 className="text-[16px] font-bold text-brand-navy mb-5 uppercase tracking-wider">Contact Info</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] font-bold text-brand-muted mb-0.5">PHONE NUMBER</div>
              <div className="text-[14px] font-semibold text-brand-navy">{business.phone}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] font-bold text-brand-muted mb-0.5">WEBSITE</div>
              <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-brand-navy hover:text-brand-orange transition-colors">
                {business.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm scroll-reveal">
        <h3 className="text-[16px] font-bold text-brand-navy mb-5 uppercase tracking-wider">Location</h3>
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div className="text-[14px] font-medium text-brand-navy leading-relaxed">
            {business.address}
          </div>
        </div>
        {/* Map Placeholder */}
        <div className="w-full h-[180px] bg-brand-light rounded-xl border border-brand-border flex items-center justify-center text-[12px] font-bold text-brand-muted">
          MAP INTEGRATION
        </div>
      </div>

      {/* Hours Card */}
      <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm scroll-reveal">
        <h3 className="text-[16px] font-bold text-brand-navy mb-5 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-orange" /> Business Hours
        </h3>
        <ul className="space-y-3 text-[14px]">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <li key={day} className="flex justify-between items-center pb-2 border-b border-brand-border/50 last:border-0 last:pb-0">
              <span className="font-medium text-brand-muted">{day}</span>
              <span className="font-semibold text-brand-navy">10:00 AM - 6:00 PM</span>
            </li>
          ))}
          <li className="flex justify-between items-center pt-1">
            <span className="font-medium text-brand-muted">Sunday</span>
            <span className="font-bold text-red-500">Closed</span>
          </li>
        </ul>
      </div>

    </div>
  );
}