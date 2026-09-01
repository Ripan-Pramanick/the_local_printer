import PageHero from '@/components/common/PageHero';
import { Check, Shield } from 'lucide-react';
import Link from 'next/link';
// ডেমো ডেটা ইম্পোর্ট করা হলো
import { packages } from '@/lib/mock-data/packages';

export default function PackagesPage() {
 
  const activePackages = packages.filter(pkg => pkg.isActive);

  return (
    <div className="bg-brand-light min-h-screen pb-24">
      <PageHero 
        badge="PRICING"
        title={<span>Simple, Transparent <span className="text-brand-orange">Pricing</span></span>}
        subtitle="List your printing business once, get discovered by local customers forever. No hidden fees, no subscriptions."
      />

      <div className="max-w-screen-xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-8">
        {activePackages.map((pkg) => (
          <div key={pkg.id} className="w-full max-w-lg bg-white rounded-3xl border border-brand-orange/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            
            <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-orange"></div>
            
            <div className="p-10">
              <div className="flex items-center gap-2 mb-4 text-brand-orange">
                <Shield className="w-5 h-5" />
                <span className="text-[12px] font-bold tracking-widest uppercase">{pkg.billingType}</span>
              </div>
              
              <h2 className="text-[28px] font-extrabold text-brand-navy mb-2">{pkg.name}</h2>
              <div className="text-[48px] font-black text-brand-navy mb-6 tracking-tight">
                {pkg.currency}{pkg.price.toLocaleString('en-IN')}
                {pkg.originalPrice && (
                  <span className="text-[16px] font-semibold text-brand-muted line-through ml-2">
                    {pkg.currency}{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <p className="text-[15px] text-brand-muted mb-8 leading-relaxed">
                {pkg.description}
              </p>

              <Link href={`/register?type=business&package=${pkg.id}`} className="flex items-center justify-center w-full h-[52px] rounded-full bg-brand-orange text-white text-[15px] font-bold hover:bg-[#E04812] transition-colors mb-8 shadow-md shadow-brand-orange/20">
                List My Business Now
              </Link>

              <div className="space-y-4">
                <div className="text-[13px] font-bold text-brand-navy uppercase tracking-wider mb-4">What's included:</div>
                {pkg.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-[14px] font-medium text-brand-navy/80">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}