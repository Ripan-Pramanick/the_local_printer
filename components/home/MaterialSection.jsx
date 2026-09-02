'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { 
  FileText, Shirt, Smartphone, Coffee, Package, Droplets, Diamond, Building2, PaintRoller, 
  File, Milk, Flame, Inbox, Grip, Tag, Ruler, Wrench, PenTool, Box, Square, Waves, X, 
  StickyNote, Type, FileBadge, Medal, Umbrella, Palette 
} from 'lucide-react';

// Exact 28 items preserved
const materialsData = [
  { name: 'Paper', icon: FileText },
  { name: 'T-shirt / Fabric', icon: Shirt },
  { name: 'Mobile Skins', icon: Smartphone },
  { name: 'Mug', icon: Coffee },
  { name: 'Pouch', icon: Package },
  { name: 'Water Bottle', icon: Droplets },
  { name: 'Acrylic', icon: Diamond },
  { name: 'ACP', icon: Building2 },
  { name: 'Canvas', icon: PaintRoller },
  { name: 'Card', icon: File },
  { name: 'Dairy Packaging', icon: Milk },
  { name: 'Flex / Vinyl', icon: Flame },
  { name: 'Foam Board', icon: Inbox },
  { name: 'Frosted Glass', icon: Grip },
  { name: 'Labels', icon: Tag },
  { name: 'MDF', icon: Ruler },
  { name: 'Metal', icon: Wrench },
  { name: 'Pen', icon: PenTool },
  { name: 'Plastic', icon: Box },
  { name: 'Rexine', icon: Square },
  { name: 'Satin', icon: Waves },
  { name: 'SS Steel', icon: X },
  { name: 'Sticker', icon: StickyNote }, 
  { name: 'Texture', icon: Type }, 
  { name: 'Tiles', icon: FileBadge }, 
  { name: 'Trophy', icon: Medal },
  { name: 'Umbrella', icon: Umbrella },
  { name: 'Vinyl', icon: Palette },
];

const featuredMaterials = ['Paper', 'T-shirt / Fabric', 'Acrylic', 'Sticker'];

// Card Entrance Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: (i) => ({
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      delay: i * 0.04,
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] 
    }
  })
};

export default function MaterialSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove}
      className="relative py-24 px-6 bg-[#FCFDFE] overflow-hidden group/section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(244,81,22,0.02)_0%,_transparent_60%)] pointer-events-none" />

      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 hidden md:block opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000 ease-out z-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(244, 81, 22, 0.025), transparent 80%)`
          }}
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes subtleFloat1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes subtleFloat2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
        @keyframes subtleFloat3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
        .float-1 { animation: subtleFloat1 5s ease-in-out infinite; }
        .float-2 { animation: subtleFloat2 6.5s ease-in-out infinite; }
        .float-3 { animation: subtleFloat3 8s ease-in-out infinite; }
      `}} />

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        <div className="flex flex-col items-start text-left mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/5 border border-brand-orange/10 text-brand-orange text-[11px] font-bold tracking-widest uppercase mb-5 hover:bg-brand-orange/10 transition-colors cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            PRINT ON
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[32px] md:text-[42px] font-extrabold text-brand-navy tracking-tight mb-4"
          >
            Every Material. Every Format.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-[15px] text-brand-muted leading-relaxed max-w-2xl"
          >
            From everyday paper to specialty surfaces — find printers who work with any substrate.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-4">
          {materialsData.map((mat, i) => {
            const Icon = mat.icon;
            const isFeatured = featuredMaterials.includes(mat.name);
            const shouldFloat = !shouldReduceMotion && (isFeatured || i % 4 === 0);
            
            const cardBg = isFeatured ? 'bg-[#FFF9F5]' : 'bg-white';
            const cardBorder = isFeatured ? 'border-[#FFE8D6]' : 'border-[#e8eaed]';

            return (
              <motion.div 
                key={i} 
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
              >
                <div className={`w-full h-full ${shouldFloat ? `float-${(i % 3) + 1}` : ''}`}>
                  
                 
                  <div className={`
                    group relative overflow-hidden w-full h-[110px] flex flex-col items-center justify-center p-4 
                    rounded-2xl border-[1.5px] ${cardBg} ${cardBorder} 
                    shadow-sm cursor-default 
                    transition-all duration-200 hover:-translate-y-1 hover:border-brand-orange hover:shadow-[0_12px_32px_rgba(232,75,22,0.1)]
                  `}>
                    
                    {/* Animated Bottom Line (Left to Right)  
                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-brand-orange transform scale-x-0 origin-left transition-transform duration-200 ease-in-out group-hover:scale-x-100 z-0"></div> */}

                    {/* Animated Icon */}
                    <Icon 
                      className="w-6 h-6 text-brand-navy mb-3 transition-all duration-200 group-hover:scale-105 group-hover:text-brand-orange relative z-10" 
                      strokeWidth={1.5} 
                    />
                    
                    {/* Text */}
                    <span className="text-[11.5px] font-semibold text-brand-navy leading-tight transition-colors duration-200 group-hover:text-brand-orange text-center relative z-10">
                      {mat.name}
                    </span>
                    
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}