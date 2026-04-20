import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Maximize2, Download } from "lucide-react";

// Import all 27 images from the gallery folder
// Note: Vite will handle the .JPG (uppercase) extension
import img1 from "@/assets/gallery/img1.jpg";
import img2 from "@/assets/gallery/img2.jpg";
import img3 from "@/assets/gallery/img3.jpg";
import img4 from "@/assets/gallery/img4.jpg";
import img5 from "@/assets/gallery/img5.jpg";
import img6 from "@/assets/gallery/img6.jpg";
import img7 from "@/assets/gallery/img7.jpg";
import img8 from "@/assets/gallery/img8.jpg";
import img9 from "@/assets/gallery/img9.jpg";
import img10 from "@/assets/gallery/img10.jpg";
import img11 from "@/assets/gallery/img11.jpg";
import img12 from "@/assets/gallery/img12.jpg";
import img13 from "@/assets/gallery/img13.jpg";
import img14 from "@/assets/gallery/img14.jpg";
import img15 from "@/assets/gallery/img15.jpg";
import img16 from "@/assets/gallery/img16.jpg";
import img17 from "@/assets/gallery/img17.jpg";
import img18 from "@/assets/gallery/img18.jpg";
import img19 from "@/assets/gallery/img19.jpg";
import img20 from "@/assets/gallery/img20.jpg";
import img21 from "@/assets/gallery/img21.jpg";
import img22 from "@/assets/gallery/img22.jpg";
import img23 from "@/assets/gallery/img23.jpg";
import img24 from "@/assets/gallery/img24.jpg";
import img25 from "@/assets/gallery/img25.jpg";
import img26 from "@/assets/gallery/img26.jpg";
import img27 from "@/assets/gallery/img27.jpg";

const imagesRaw = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27
];

const galleryImages = imagesRaw.map((src) => ({ src }));

const EventGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selected !== null) {
      setSelected((selected + 1) % galleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selected !== null) {
      setSelected((selected - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected === null) return;
    
    const src = galleryImages[selected].src;
    const filename = src.split('/').pop()?.split('?')[0] || `divine-memory-${selected + 1}.jpg`;

    const link = document.createElement("a");
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <section id="gallery" className="relative py-24 bg-temple-deep overflow-hidden">
      {/* Decorative background elements & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-temple-black to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-temple-black to-transparent z-10" />
        
        {/* Floating Ambient Glows for Divine Atmosphere */}
        <motion.div
          animate={{ x: [0, 50, -20, 0], y: [0, -30, 40, 0], scale: [1, 1.2, 0.9, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -60, 30, 0], y: [0, 50, -40, 0], scale: [1, 1.3, 0.8, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-sacred-gold-light/20 blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 md:w-20 bg-primary/40" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Camera className="w-5 h-5 text-primary/80 drop-shadow-glow" />
            </motion.div>
            <span className="font-heading text-primary text-xs md:text-sm font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] glow-soft">Visual Journey</span>
            <div className="h-[1px] w-12 md:w-20 bg-primary/40" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-7xl font-black text-gradient-gold mb-6 italic tracking-tight drop-shadow-glow"
          >
            Divine Memories
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-foreground/60 font-body text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-4"
          >
            Immerse yourself in the captured moments of grace, celebration, and devotion. Every frame holds the spiritual essence of the sacred union.
          </motion.p>
        </div>

        {/* Cinematic Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 perspective-1000">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 8) * 0.1, type: "spring", stiffness: 50 }}
              onClick={() => setSelected(i)}
              className="inline-block w-full"
            >
              <motion.div 
                layoutId={`container-${img.src}`}
                className="relative overflow-hidden rounded-xl md:rounded-2xl bg-temple-black shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] transition-shadow duration-700 cursor-pointer group"
              >
                <motion.img
                  layoutId={`image-${img.src}`}
                  src={img.src}
                  alt="Event Memory"
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out will-change-transform"
                  loading="lazy"
                />
                
                {/* Advanced Light-leak & Glassmorphic Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-temple-deep/90 via-temple-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center transform scale-50 group-hover:scale-100 transition-all duration-500 border border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  >
                    <Maximize2 className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pure Cinematic Lightbox with Seamless Shared Layout Transition */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-temple-deep/98 backdrop-blur-2xl flex flex-col items-center justify-center p-2 md:p-8"
            onClick={() => setSelected(null)}
          >
            {/* Ambient Backlight for Lightbox */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
                <div className="w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[100px]" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.25 }}
              className="absolute top-4 right-20 md:top-8 md:right-[5.5rem] z-[110] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
              onClick={handleDownload}
              title="Download Memory"
            >
              <Download className="w-5 h-5" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.3 }}
              className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/30 hover:border-primary/50 transition-all backdrop-blur-md group shadow-2xl"
              onClick={prevImage}
            >
              <ChevronLeft className="w-7 h-7 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.3 }}
              className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/30 hover:border-primary/50 transition-all backdrop-blur-md group shadow-2xl"
              onClick={nextImage}
            >
              <ChevronRight className="w-7 h-7 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div
              layoutId={`container-${galleryImages[selected].src}`}
              className="relative max-w-[95vw] md:max-w-[85vw] max-h-[90vh] flex flex-col items-center justify-center z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`image-${galleryImages[selected].src}`}
                src={galleryImages[selected].src}
                alt="Divine Memory"
                className="max-w-full max-h-[85vh] object-contain rounded-lg md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
              />
              
              {/* Premium Glow Counter Tag */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-12 md:bottom-auto md:top-full md:mt-8 left-1/2 -translate-x-1/2 px-8 py-3 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-full flex items-center gap-4 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                <div className="relative flex items-center justify-center w-3 h-3">
                  <span className="absolute w-full h-full rounded-full bg-primary animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="text-primary font-heading text-sm md:text-base font-bold tracking-[0.4em] tabular-nums">
                  {selected + 1} / {galleryImages.length}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventGallery;
