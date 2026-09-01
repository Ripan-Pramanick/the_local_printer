import { notFound } from 'next/navigation';
import PageHero from '@/components/common/PageHero';
import BusinessCard from '@/components/directory/BusinessCard';
import FilterSidebar from '@/components/directory/FilterSidebar';
import { categories } from '@/lib/mock-data/categories';
import { businesses } from '@/lib/mock-data/businesses';

export default function CategoryPage({ params }) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) notFound();

  // Filter businesses by this category
  const categoryBusinesses = businesses.filter(b => b.category === category.name);

  return (
    <div className="bg-brand-light min-h-screen">
      <PageHero 
        title={`${category.name} Services`} 
        subtitle={`Find the best ${category.name.toLowerCase()} businesses and designers near you. Verified and trusted printing solutions.`}
      />
      
      <div className="max-w-screen-xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-full lg:w-[300px] shrink-0">
          <FilterSidebar />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-border">
            <h1 className="text-[20px] font-bold text-brand-navy">
              Found <span className="text-brand-orange">{categoryBusinesses.length} Printers</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryBusinesses.length > 0 ? (
              categoryBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-brand-muted">
                No businesses found in this category right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}