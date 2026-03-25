import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "✦ ಲೋಕ ಕಲ್ಯಾಣಾರ್ಥ ✦",
  "“Vina Venkatesam Na Natho Na Nathah,<br/>Sada Venkatesam Smarami Smarami”",
  "“In the Divine Presence of the Supreme Lord, every soul finds its peaceful path to Dharma.”",
  "“Witnessing the Celestial Wedding of Srinivasa and Padmavathi brings endless blessings and prosperity.”",
  "✦ ಶ್ರೀ ಶ್ರೀನಿವಾಸ ಕಲ್ಯಾಣೋತ್ಸವ ✦"
];

const DevotionalQuotes = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-temple-black relative overflow-hidden flex items-center justify-center min-h-[250px]">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-temple-gradient" />
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,183,0,0.15)_0%,transparent_70%)] animate-pulse-glow" />

      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="space-y-4"
          >
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />
            
            <h3 
              className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-gradient-gold leading-relaxed md:leading-loose drop-shadow-glow px-4"
              dangerouslySetInnerHTML={{ __html: quotes[index] }}
            />
            
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center gap-3 mt-8">
          {quotes.map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full border border-primary/40 transition-all duration-700 ${
                i === index ? "bg-primary w-6" : "bg-transparent scale-75"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevotionalQuotes;
