import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import img1 from "@/assets/gallery/img1.jpg";
import img2 from "@/assets/gallery/img2.jpg";
import img3 from "@/assets/gallery/img3.jpg";
import img4 from "@/assets/gallery/img4.jpg";
import img5 from "@/assets/gallery/img5.jpg";
import img6 from "@/assets/gallery/img6.jpg";
import img7 from "@/assets/gallery/img7.jpg";
import img8 from "@/assets/gallery/img8.jpg";
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
  img1, img2, img3, img4, img5, img6, img7, img8, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27
];

const EventGallery = () => {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Decide how many photos per sheet based on device size
  // On desktop: 2 photos per physical sheet (Front / Back of one sheet paper).
  // On mobile: 1 photo per sheet (Front only, single active viewport).
  const photosPerSheet = isMobile ? 1 : 2;
  const photoSheets = [];

  for (let i = 0; i < imagesRaw.length; i += photosPerSheet) {
    if (isMobile) {
      photoSheets.push({
        front: imagesRaw[i],
        back: null // Mobile doesn't use the back, they flip completely off-screen left
      });
    } else {
      photoSheets.push({
        front: imagesRaw[i],
        back: imagesRaw[i + 1] || null
      });
    }
  }

  const totalSheets = photoSheets.length + 1; // 1 Cover Sheet + Photo Sheets 

  const [isPaused, setIsPaused] = useState(false);

  // Clamp current page if resizing changes sheet count
  useEffect(() => {
    if (currentPage >= totalSheets) {
      setCurrentPage(totalSheets - 1);
    }
  }, [isMobile, totalSheets]);

  const nextPage = () => {
    if (currentPage < totalSheets - 1) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalSheets]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setCurrentPage((prev) => (prev < totalSheets - 1 ? prev + 1 : 0));
    }, 4000); // Flips page every 4 seconds
    return () => clearTimeout(timer);
  }, [isPaused, totalSheets, currentPage]);

  const bgTexture = "url('https://www.transparenttextures.com/patterns/cream-paper.png')";

  return (
    <section 
      id="gallery" 
      className="relative py-20 md:py-32 bg-temple-deep overflow-hidden flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // Delay resuming autoplay slightly after touch
        setTimeout(() => setIsPaused(false), 2000);
      }}
    >
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-temple-black to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-temple-black to-transparent z-10" />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"
        />
      </div>

      <div className="container mx-auto px-2 relative z-20 flex flex-col items-center w-full">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="h-[1px] w-8 md:w-20 bg-primary/40" />
            <Camera className="w-4 h-4 md:w-5 md:h-5 text-primary/80 drop-shadow-glow" />
            <span className="font-heading text-primary text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] glow-soft">Visual Journey</span>
            <div className="h-[1px] w-8 md:w-20 bg-primary/40" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-2xl md:text-5xl lg:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg"
          >
            The Divine Album
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col items-center"
        >
          {/* BOOK CONTAINER */}
          <div 
            className="relative w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[90vw] lg:max-w-[1200px] aspect-[1.2/1] md:aspect-[2.2/1] preserve-3d mb-8 shadow-[0_40px_80px_rgba(0,0,0,1)] rounded-xl md:rounded-3xl mx-auto"
            style={{ perspective: "3000px" }}
          >
            
            {/* The Hardcover Backing (Book edges) */}
            <div className="absolute inset-0 bg-[#fefdfa] rounded-xl md:rounded-3xl shadow-2xl border-[6px] md:border-[12px] border-[#ede5d0]" style={{ backgroundImage: bgTexture }} />
            
            {/* The structural Spine in the center (Desktop only effectively) */}
            {!isMobile && (
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 md:w-16 bg-gradient-to-r from-black/5 via-black/10 to-black/5 z-[1] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] flex justify-center">
                <div className="h-full w-[1px] md:w-[2px] bg-black/10" />
              </div>
            )}
            
            {/* Mobile Spine on the left edge */}
            {isMobile && (
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-[1] rounded-l-xl pointer-events-none" />
            )}

            {/* Render each physical sheet of paper */}
            <div className="absolute inset-2 md:inset-6 preserve-3d">
              {Array.from({ length: totalSheets }).map((_, index) => {
                const isFlipped = currentPage > index;
                const zIndex = isFlipped ? index : totalSheets - index;
                
                // Mount unmounting performance check
                if (Math.abs(currentPage - index) > 3 && index !== 0 && index !== totalSheets - 1) {
                  return null;
                }

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      rotateY: isFlipped ? -180 : 0,
                      zIndex: zIndex,
                    }}
                    transition={{
                      duration: 1.4,
                      ease: [0.645, 0.045, 0.355, 1.0],
                    }}
                    style={{
                      transformOrigin: "left center",
                    }}
                    className={`absolute top-0 h-full preserve-3d ${isMobile ? "w-full left-0" : "w-1/2 right-0"}`}
                  >
                    {/* ==== FRONT OF SHEET ==== */}
                    <div 
                      className={`absolute inset-0 w-full h-full backface-hidden bg-[#fffcf5] border-[#e0d6c0] shadow-[-10px_0_30px_rgba(0,0,0,0.05)] overflow-hidden ${isMobile ? "rounded-xl border border-l-0" : "rounded-r-xl border-y border-r"}`}
                      style={{ 
                        transform: "translateZ(1px)",
                        backgroundImage: bgTexture 
                      }}
                    >
                      {/* Spine shadow for front page */}
                      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black/10 to-transparent z-20 pointer-events-none" />
                      
                      {index === 0 ? (
                        /* INDEX 0 FRONT: The Cover Page inside the book */
                        <div className="w-full h-full relative p-4 md:p-12 flex flex-col items-center justify-center text-center">
                          <div className="absolute inset-2 md:inset-6 border-[2px] md:border-[4px] border-[#d4af37]/40 rounded-lg pointer-events-none" />
                          <div className="absolute inset-3 md:inset-8 border border-[#d4af37]/20 rounded pointer-events-none" />
                          
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                          >
                            <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-[#d4af37] mb-4 md:mb-8 drop-shadow-md" />
                          </motion.div>
                          <h1 className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black text-[#8b6914] uppercase leading-tight mb-2 md:mb-6 tracking-tighter">
                            Srinivasa<br />Kalyanotsava
                          </h1>
                          <div className="h-[2px] w-24 md:w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-3 md:mb-6" />
                          <p className="font-body text-[#523d06] uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm font-bold">Divine Book of Memories</p>
                        </div>
                      ) : (
                        /* PHOTO FRONT: The Gallery Photo */
                        <div className="w-full h-full p-2 md:p-8 flex flex-col items-center justify-center min-h-0 min-w-0">
                          <div className="relative bg-white p-2 md:p-3 shadow-xl border border-black/5 hover:-translate-y-1 transition-transform duration-500 rounded flex items-center justify-center max-w-full max-h-[85%]">
                            <img 
                              src={photoSheets[index - 1].front} 
                              className="max-w-full max-h-full object-contain rounded-sm relative z-10" 
                              alt="Gallery Frame" 
                            />
                            {/* Inner vignette */}
                            <div className="absolute inset-2 md:inset-3 border border-black/5 pointer-events-none z-20" />
                          </div>
                          <div className="mt-3 md:mt-4 text-[#8b6914]/50 font-body text-[10px] md:text-xs tracking-widest font-bold shrink-0">
                            — {isMobile ? index : ((index - 1) * 2) + 1} —
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ==== BACK OF SHEET ==== */}
                    <div 
                      className={`absolute inset-0 w-full h-full backface-hidden border-[#e0d6c0] bg-[#fffcf5] shadow-[10px_0_30px_rgba(0,0,0,0.05)] ${isMobile ? "rounded-xl border border-r-0" : "rounded-l-xl border-y border-l"}`}
                      style={{ 
                        transform: "rotateY(180deg) translateZ(1px)",
                        backgroundImage: bgTexture,
                      }}
                    >
                      {/* Spine shadow for back page */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-black/10 to-transparent z-20 pointer-events-none" />

                      {index === 0 ? (
                        /* INDEX 0 BACK: Intro / Preamble */
                        <div className="w-full h-full relative p-6 md:p-16 flex flex-col items-center justify-center text-center">
                           <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-[#d4af37]/30 mb-8" />
                           <p className="font-body text-xs md:text-lg lg:text-xl text-[#3b2a0c]/80 leading-relaxed italic max-w-[80%] mx-auto">
                             "Immerse yourself in the captured moments of grace, celebration, and eternal devotion. Every frame holds the spiritual essence of the sacred union."
                           </p>
                           <div className="mt-8 h-[1px] w-16 bg-[#d4af37]/30 mx-auto" />
                        </div>
                      ) : (
                        /* PHOTO BACK: Desktop only left side photo */
                        <div className="w-full h-full p-2 md:p-8 flex flex-col items-center justify-center min-h-0 min-w-0">
                          {!isMobile && photoSheets[index - 1].back ? (
                            <>
                              <div className="relative bg-white p-2 md:p-3 shadow-xl border border-black/5 hover:-translate-y-1 transition-transform duration-500 rounded flex items-center justify-center max-w-full max-h-[85%]">
                                <img 
                                  src={photoSheets[index - 1].back!} 
                                  className="max-w-full max-h-full object-contain rounded-sm relative z-10" 
                                  alt="Gallery Frame" 
                                />
                                <div className="absolute inset-2 md:inset-3 border border-black/5 pointer-events-none z-20" />
                              </div>
                              <div className="mt-4 text-[#8b6914]/50 font-body text-xs tracking-widest font-bold shrink-0">
                                — {((index - 1) * 2) + 2} —
                              </div>
                            </>
                          ) : (
                            /* Blank page */
                            <div className="w-full h-full flex items-center justify-center opacity-10">
                              <BookOpen className="w-16 h-16 text-[#8b6914]" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mt-2 z-50">
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-3 md:p-5 rounded-full border border-primary/30 bg-[#fdfaf5] text-[#8b6914] shadow-xl transition-all
              ${currentPage === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-primary/10 hover:text-primary"}
              `}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </motion.button>

            <div className="text-center min-w-[120px] md:min-w-[180px]">
              <span className="font-heading font-black text-white text-xl md:text-3xl tracking-tighter tabular-nums drop-shadow-md">
                {currentPage === 0 ? "COVER" : (isMobile ? `PHOTO ${currentPage}` : `SPREAD ${currentPage}`)} 
              </span>
              <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.3em] font-bold mt-1">out of {totalSheets - 1}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              disabled={currentPage === totalSheets - 1}
              className={`p-3 md:p-5 rounded-full border border-primary/30 bg-[#fdfaf5] text-[#8b6914] shadow-xl transition-all
              ${currentPage === totalSheets - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-primary/10 hover:text-primary"}
              `}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventGallery;
