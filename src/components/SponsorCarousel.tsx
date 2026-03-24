import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const sponsors = [
  { name: "Katapadi Pai Family", logo: "/sponsors/katpadi-family.jpg" },
  { name: "SVS Vidyavardhaka Sangha", logo: "/sponsors/svs.jpg" },
  { name: "Adyar Petrol Pump", logo: "/sponsors/hp.png" },
  { name: "Sun Matrix Audio Lab", logo: "/sponsors/sun-matrix.jpg" },
  { name: "Invenger Technologies", logo: "/sponsors/invenger.png" },
  { name: "Vijaya Industries", logo: "/sponsors/vijaya.jpg" },
  { name: "Iratha Auto", logo: "/sponsors/iratha.png" }
];

const SponsorCarousel = () => {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation speed (lower is slower)
  const speed = 0.5;

  useAnimationFrame((_, delta) => {
    if (isDragging || !contentRef.current) return;

    // Move x
    const currentX = x.get();
    const halfWidth = contentRef.current.offsetWidth / 3;
    
    let nextX = currentX - speed * (delta / 16); // Normalize by ~60fps
    
    // Seamless wrapping
    if (nextX <= -halfWidth) {
      nextX += halfWidth;
    }
    
    x.set(nextX);
  });

  return (
    <section className="py-4 md:py-8 bg-temple-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,183,0,0.05)_0%,transparent_70%)] opacity-50" />
      
      {/* Premium Gradient Fades - Uniform with other sections */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-temple-black via-temple-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-temple-black via-temple-black/80 to-transparent z-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-body text-primary text-xl uppercase tracking-widest mb-4 font-semibold"
        >
          ✦ Patronage ✦
        </motion.p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-gradient-gold">
          Grace Supported By
        </h2>
      </div>

      <div className="relative mt-4 md:mt-8 px-6 md:px-12 select-none touch-pan-y" ref={containerRef}>
        <div className="relative overflow-hidden w-full">
          <motion.div
            style={{ x }}
            drag="x"
            // Very large constraints to allow free dragging
            dragConstraints={{ left: -5000, right: 5000 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              // After drag, ensure we are still within the seamless range
              const currentX = x.get();
              if (contentRef.current) {
                const halfWidth = contentRef.current.offsetWidth / 3;
                x.set(currentX % halfWidth);
              }
            }}
            className="flex whitespace-nowrap gap-3 md:gap-12 text-center items-center cursor-grab active:cursor-grabbing will-change-transform"
            ref={contentRef}
          >
            {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
              <div
                key={i}
                className="px-4 py-3 md:px-10 md:py-6 min-h-[110px] md:min-h-[180px] bg-card border border-primary/30 rounded-2xl flex flex-col items-center justify-center min-w-[180px] md:min-w-[320px] shadow-divine group hover:border-primary transition-all duration-300 transform pointer-events-none gap-2 md:gap-4"
              >
                <div className="pointer-events-auto flex flex-col items-center gap-2 md:gap-4 w-full">
                  {sponsor.logo && (
                    <div className="h-16 md:h-28 w-full flex items-center justify-center bg-white rounded-xl p-2 md:p-4 shadow-inner">
                      <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                  )}
                  <p className="font-heading text-base md:text-3xl font-bold text-white group-hover:text-primary transition-colors text-center drop-shadow-md tracking-wide">
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
