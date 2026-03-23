import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import coverImg from "@/assets/hero-kalyanotsava.png";
import img1 from "@/assets/invitation/media__1773996372498.jpg";
import img2 from "@/assets/invitation/media__1773996372579.jpg";
import img3 from "@/assets/invitation/media__1773996372672.jpg";
import imgKannada from "@/assets/invitation/invitation-kannada.jpg";

// Exactly 5 unique pages (5 sheets)
const sheets = [
  { front: { type: "cover", src: coverImg, title: "Sri Srinivasa Kalyanotsava", subtitle: "Divine Invitation" }, back: { type: "empty" } },
  { front: { type: "content", src: imgKannada, title: "Kannada Invitation" }, back: { type: "empty" } },
  { front: { type: "content", src: img1, title: "Sacred Invocation" }, back: { type: "empty" } },
  { front: { type: "content", src: img2, title: "Grand Ceremonies" }, back: { type: "empty" } },
  { front: { type: "content", src: img3, title: "Final Invitation" }, back: { type: "empty" } }
];

const DevotionalGallery = () => {
  const [currentSheet, setCurrentSheet] = useState(0);

  const nextSheet = () => {
    if (currentSheet < sheets.length - 1) setCurrentSheet(currentSheet + 1);
  };

  const prevSheet = () => {
    if (currentSheet > 0) setCurrentSheet(currentSheet - 1);
  };

  return (
    <section 
      id="gallery" 
      className="relative w-full py-8 md:py-12 flex flex-col items-center justify-center bg-temple-deep overflow-hidden"
    >
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">
        <div className="text-center mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <BookOpen className="w-5 h-5 text-primary/60" />
            <h2 className="font-heading text-3xl md:text-5xl font-black text-gradient-gold uppercase">
              A Cordial Invitation
            </h2>
            <BookOpen className="w-5 h-5 text-primary/60" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-foreground/60 font-body text-lg italic max-w-2xl mx-auto"
          >
            Step into the sacred narrative of our divine union through this digital chronicle.
          </motion.p>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
        >
            <div className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[1/1.3] preserve-3d mb-12 md:mb-16">
            {sheets.map((sheet, index) => {
                const isFlipped = currentSheet > index;
                const zIndex = isFlipped ? index : sheets.length - index;

                return (
                <motion.div
                    key={index}
                    initial={false}
                    animate={{
                    rotateY: isFlipped ? -180 : 0,
                    zIndex: zIndex,
                    }}
                    transition={{
                    duration: 0.9,
                    ease: [0.645, 0.045, 0.355, 1.0],
                    }}
                    style={{
                    transformOrigin: "left center",
                    perspective: "2500px",
                    }}
                    className="absolute inset-0 w-full h-full preserve-3d"
                >
                    {/* FRONT SIDE (Positive Z to stay on top) */}
                    <div 
                        className={`absolute inset-0 w-full h-full backface-hidden rounded-[8px] md:rounded-[12px] shadow-2xl border-[6px] md:border-[10px] border-primary/20 bg-[#fbf5e4] p-4 overflow-hidden
                            ${sheet.front.type === "cover" ? "bg-gradient-to-br from-sacred-gold-dark via-temple-dark to-sacred-gold-dark" : ""}
                        `}
                        style={{ 
                            backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')",
                            boxShadow: "inset 0 0 60px rgba(0,0,0,0.1), 10px 10px 40px rgba(0,0,0,0.5)",
                            transform: "translateZ(1px)"
                        }}
                    >
                    <div className="absolute inset-2 border border-primary/10 rounded-[4px] pointer-events-none" />

                    {sheet.front.type === "cover" ? (
                        <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 space-y-6">
                        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-primary/40 overflow-hidden shadow-glow bg-black/20">
                            <img src={sheet.front.src} className="w-full h-full object-cover block" alt="Cover" />
                        </div>
                        <div>
                            <h3 className="font-heading text-xl md:text-3xl font-black text-gradient-gold leading-tight uppercase">
                            {sheet.front.title}
                            </h3>
                            <p className="font-body text-primary/80 text-[10px] md:text-sm tracking-[0.2em] uppercase mt-2">
                            {sheet.front.subtitle}
                            </p>
                        </div>
                        </div>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center p-2 relative bg-white/30 rounded-lg shadow-inner">
                            <img 
                                src={sheet.front.src} 
                                className="max-h-full max-w-full object-contain drop-shadow-2xl relative z-10 block" 
                                alt={sheet.front.title || "Page"} 
                                style={{ transform: "translateZ(2px)" }}
                            />
                        </div>
                    )}
                    <div className="absolute top-0 left-0 bottom-0 w-[5px] bg-black/10" />
                    </div>

                    {/* BACK SIDE (Negative Z to stay behind) */}
                    <div 
                        className="absolute inset-0 w-full h-full backface-hidden rounded-[8px] md:rounded-[12px] bg-[#fdfaf2] border-[6px] md:border-[10px] border-primary/10 p-2"
                        style={{ 
                            transform: "rotateY(180deg) translateZ(1px)",
                            backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')",
                            boxShadow: "inset 0 0 50px rgba(0,0,0,0.1)"
                        }}
                    >
                        <div className="absolute inset-1 border border-primary/10 rounded-[4px] pointer-events-none" />
                        <div className="h-full w-full flex items-center justify-center opacity-10" style={{ transform: "rotateY(180deg)" }}>
                            <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                        </div>
                    </div>
                </motion.div>
                );
            })}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 md:gap-12 z-50">
            <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSheet}
                disabled={currentSheet === 0}
                className={`p-3 md:p-4 rounded-full border-2 border-primary/20 bg-black/60 backdrop-blur-xl text-primary transition-all
                ${currentSheet === 0 ? "opacity-10 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground shadow-glow-primary"}
                `}
            >
                <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="text-center px-4">
                <span className="font-heading font-black text-primary text-xl md:text-3xl tracking-tighter">
                {currentSheet + 1} <span className="text-primary/30 text-lg font-normal">/ {sheets.length}</span>
                </span>
                <p className="text-[10px] md:text-xs text-primary/40 uppercase tracking-[0.2em] mt-1 font-bold">Divine Leaf</p>
            </div>

            <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSheet}
                disabled={currentSheet === sheets.length - 1}
                className={`p-3 md:p-4 rounded-full border-2 border-primary/20 bg-black/60 backdrop-blur-xl text-primary transition-all
                ${currentSheet === sheets.length - 1 ? "opacity-10 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground shadow-glow-primary"}
                `}
            >
                <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default DevotionalGallery;
