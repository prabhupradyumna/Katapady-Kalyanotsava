import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const sponsors = [
  { name: "Katapadi Pai Family", logo: "/sponsors/katpadi-family.jpg" },
  { name: "SVS Vidyavardhaka Sangha", logo: "/sponsors/svs.jpg" },
  { name: "Adyar Petrol Pump", logo: "/sponsors/adyar-petrol-pump.jpg" },
  { name: "Sun Matrix Audio Lab", logo: "/sponsors/sun-matrix.jpg" },
  { name: "Invenger Technologies", logo: "/sponsors/invenger.png" },
  { name: "Invenger Foundation", logo: "/sponsors/invenger-foundation.png" },
  { name: "Inexo ERP & CRM Software", logo: "/sponsors/inexo.png" },
  { name: "School Leader Cinema", logo: "/sponsors/school-leader.png" },
  { name: "Vijaya Industries", logo: "/sponsors/vijaya.jpg" },
  { name: "Iratha Auto", logo: "/sponsors/iratha.png" }
];

const SponsorCarousel = () => {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [oneSetWidth, setOneSetWidth] = useState(0);

  // Update measurements on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        // Gap is md:gap-8 (32px), gap-3 (12px)
        const gap = window.innerWidth >= 768 ? 32 : 12;
        // Total width of 3 sets. One set distance = (TotalWidth + gap) / 3
        setOneSetWidth((contentRef.current.scrollWidth + gap) / 3);
      }
    };
    
    // Small delay to ensure children are rendered
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, []);

  // Animation speed (lower is slower)
  const speed = 0.5;

  useAnimationFrame((_, delta) => {
    if (isDragging || !contentRef.current || oneSetWidth === 0) return;

    // Move x
    const currentX = x.get();
    let nextX = currentX - speed * (delta / 16); // Normalize by ~60fps
    
    // Seamless wrapping
    if (nextX <= -oneSetWidth) {
      nextX += oneSetWidth;
    }
    
    x.set(nextX);
  });

  return (
    <section id="patronage" className="py-4 md:py-8 bg-temple-black overflow-hidden relative optimize-gpu">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,183,0,0.05)_0%,transparent_70%)] opacity-50" />
      
      {/* Premium Gradient Fades - Uniform width with other sections */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-60 bg-gradient-to-r from-temple-black via-temple-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-60 bg-gradient-to-l from-temple-black via-temple-black/80 to-transparent z-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-2 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-body text-sm md:text-base uppercase tracking-widest mb-1 font-semibold"
        >
          ✦ Patronage ✦
        </motion.p>
        <h2 className="font-heading text-xl md:text-3xl lg:text-4xl font-black text-gradient-gold leading-tight mb-3">
          Grace Supported By
        </h2>
      </div>

      <div className="relative mt-2 md:mt-4 px-6 md:px-12 select-none touch-pan-y" ref={containerRef}>
        <div className="relative overflow-hidden w-full">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -5000, right: 5000 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              const currentX = x.get();
              if (oneSetWidth > 0) {
                x.set(currentX % oneSetWidth);
              }
            }}
            className="flex whitespace-nowrap gap-3 md:gap-8 text-center items-center cursor-grab active:cursor-grabbing will-change-transform"
            ref={contentRef}
          >
            {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
              <div
                key={i}
                className="px-4 py-3 md:px-6 md:py-4 min-h-[100px] md:min-h-[150px] bg-card border border-primary/30 rounded-lg flex flex-col items-center justify-center min-w-[160px] md:min-w-[260px] shadow-divine group hover:border-primary transition-all duration-300 transform pointer-events-none gap-2 md:gap-3"
              >
                <div className="pointer-events-auto flex flex-col items-center gap-2 md:gap-3 w-full">
                  {sponsor.logo && (
                    <div className="h-14 md:h-24 w-full flex items-center justify-center bg-gray-50 rounded-md p-1.5 md:p-3 shadow-inner">
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                  <p className="font-heading text-[10px] md:text-sm font-bold text-white group-hover:text-primary transition-colors text-center drop-shadow-md tracking-normal whitespace-normal break-words leading-tight">
                    {sponsor.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorCarousel;
