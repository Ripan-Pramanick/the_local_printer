import PageHero from '@/components/common/PageHero';
import StatsStrip from '@/components/home/StatsStrip';
import SectionHeader from '@/components/common/SectionHeader';
import HowItWorks from '@/components/home/HowItWorks';
import { MapPin, CheckCircle, Search, Shield, Zap, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-brand-light">
      <PageHero 
        badge="ABOUT OUR PLATFORM"
        title={<span>About <span className="text-brand-orange">The Local Printer</span></span>}
        subtitle="We're on a mission to connect every Indian business and individual with the nearest, most trusted printing professionals — instantly and without hassle."
      />
      <StatsStrip />

      {/* Built for India's Print Community - Split Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader 
              badge="WHO WE ARE" 
              title="Built for India's Print Community" 
              subtitle=""
            />
            <div className="text-brand-muted text-[15px] leading-relaxed space-y-6 max-w-lg mt-[-2rem]">
              <p>The printing industry in India is vast and fragmented. Finding the right printer—whether for a single t-shirt or a bulk corporate order—has always been a mix of guesswork, endless calls, and traveling across the city.</p>
              <p>We built The Local Printer to change that. By combining GPS technology with a strict verification system, we ensure that you find reliable printers right in your neighborhood within seconds.</p>
              <p>For print businesses, it's a powerful tool to be discovered by customers who are already looking for their specific services nearby.</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-brand-light p-8 rounded-2xl border border-brand-border/60">
              <MapPin className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-[18px] font-bold text-brand-navy mb-2">GPS-First Platform</h3>
              <p className="text-[14px] text-brand-muted leading-relaxed">Proximity is everything. Our core algorithm is location-based, meaning you always find the closest available experts.</p>
            </div>
            <div className="bg-brand-light p-8 rounded-2xl border border-brand-border/60">
              <CheckCircle className="w-8 h-8 text-brand-orange mb-4" />
              <h3 className="text-[18px] font-bold text-brand-navy mb-2">Verified Listings</h3>
              <p className="text-[14px] text-brand-muted leading-relaxed">Quality matters. Every listing marked 'Verified' has passed our authentication checks to ensure reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="py-24 px-6 bg-brand-navy">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader badge="OUR PURPOSE" title="Why We Built This" lightText={true} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Search, title: 'Hyperlocal Discovery', desc: 'Stop blindly searching the internet. Find what is within your 5km radius first.' },
              { icon: Zap, title: 'Eliminate Middlemen', desc: 'Direct contact guarantees the best price by cutting out third-party commissions.' },
              { icon: TrendingUp, title: 'Empower Local Business', desc: 'We give small print shops the online visibility to compete with massive corporations.' },
              { icon: Shield, title: 'Privacy by Default', desc: 'Customers don\'t need to share their number just to search. Contact shops directly.' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <item.icon className="w-6 h-6 text-brand-orange mb-4" />
                <h4 className="text-[16px] font-bold text-white mb-2">{item.title}</h4>
                <p className="text-[13px] text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Final Customer CTA */}
      <section className="bg-brand-orange py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-white mb-8">
            Ready to Find Your Nearest Printer?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/search" className="h-[52px] px-8 rounded-full bg-white text-brand-orange font-bold hover:bg-brand-light transition-colors shadow-lg flex items-center">
               Find Printers Near Me
             </Link>
             <Link href="/register?type=business" className="h-[52px] px-8 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors flex items-center">
               List My Business
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}