import { notFound } from 'next/navigation';
import BusinessHero from '@/components/business/BusinessHero';
import BusinessInfoSidebar from '@/components/business/BusinessInfoSidebar';
import ServicesSection from '@/components/business/ServicesSection';
import Gallery from '@/components/business/Gallery';
import ReviewSection from '@/components/business/ReviewSection';
// import RelatedBusinesses from '@/components/business/RelatedBusinesses';

import { businesses } from '@/lib/mock-data/businesses';

export default function BusinessProfilePage({ params }) {

  const business = businesses.find((b) => b.slug === params.slug);

  if (!business) {
    notFound(); 
  }

  return (
    <div className="bg-brand-light min-h-screen pb-20">
      <BusinessHero business={business} />
      
      <div className="max-w-screen-xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm">
              <h2 className="text-[20px] font-extrabold text-brand-navy mb-4">About the Business</h2>
              <p className="text-[15px] text-brand-muted leading-relaxed">
                {business.about}
              </p>
            </section>
            <ServicesSection services={business.services} />
            <Gallery />
            <ReviewSection />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[100px]">
              <BusinessInfoSidebar business={business} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}