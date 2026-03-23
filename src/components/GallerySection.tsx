import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X } from "lucide-react";
import heroDeity from "@/assets/hero-deity.png";
import templeBg from "@/assets/temple-bg.jpg";
import templeInterior from "@/assets/temple-interior.jpg";
import templeRitual from "@/assets/temple-ritual.jpg";
import tirumalaHills from "@/assets/tirumala-hills.jpg";
import prasadam from "@/assets/prasadam.jpg";

const images = [
  { src: heroDeity, alt: "Lord Venkateswara", span: "row-span-2" },
  { src: templeBg, alt: "Temple Gopuram at sunset", span: "" },
  { src: templeRitual, alt: "Sacred rituals and diyas", span: "" },
  { src: templeInterior, alt: "Temple interior pillars", span: "col-span-2" },
  { src: tirumalaHills, alt: "Tirumala hills at dawn", span: "" },
  { src: prasadam, alt: "Sacred Prasadam offerings", span: "" },
];

const GallerySection = () => {
  const { ref, isInView } = useScrollReveal();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-primary text-lg tracking-widest uppercase mb-3">
            ✦ Divine Darshan ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            Devotional Gallery
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`${img.span} group overflow-hidden rounded-xl cursor-pointer relative`}
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-end p-4">
                <span className="font-body text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-foreground/70 hover:text-primary transition-colors"
              aria-label="Close"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
