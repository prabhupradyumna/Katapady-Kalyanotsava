import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const targetDate = new Date("2026-04-11T05:00:00").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="py-6 md:py-8 bg-temple-gradient relative overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-depth-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      {/* Background mandala subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <div className="w-[1000px] h-[1000px] border-[1px] border-primary rounded-full animate-rotate-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <p className="font-body text-primary text-sm md:text-lg uppercase tracking-widest mb-2 md:mb-4 lowercase">
            ✦ Initializing Spiritual Count ✦
          </p>
          <h2 className="font-heading text-xl md:text-4xl font-bold text-gradient-gold mb-6 md:mb-10">
            The Divine Union Begins In
          </h2>

          <div className="grid grid-cols-4 gap-2 md:gap-8">
            {units.map((unit) => (
              <motion.div
                key={unit.label}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-card/40 backdrop-blur-xl border border-primary/20 p-2 md:p-6 rounded-xl md:rounded-2xl shadow-divine transition-all duration-300"
              >
                <div className="overflow-hidden h-[30px] md:h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={unit.value}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="block font-heading text-xl md:text-5xl font-bold text-primary"
                    >
                      {String(Math.max(0, unit.value)).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="font-body text-foreground/50 uppercase tracking-[0.1em] md:tracking-[0.2em] mt-1 md:mt-2 text-[8px] md:text-xs">
                  {unit.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownTimer;
