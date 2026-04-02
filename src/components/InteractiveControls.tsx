import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Phone, HeartPulse, ShieldAlert, PhoneCall } from "lucide-react";
import govindaMusic from "@/assets/govinda-namavali.mp3";
import { useTranslation } from "react-i18next";

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress for the ring
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const audio = new Audio(govindaMusic);
    audio.loop = true;
    audio.volume = 0; // Start at 0 for fade in
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out
      let volume = audio.volume;
      const fadeOut = setInterval(() => {
        if (volume > 0.1) {
          volume -= 0.1;
          audio.volume = Math.max(0, volume);
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 50);
    } else {
      audio.play().catch(e => console.log("User interaction required for audio"));
      // Fade in
      let volume = 0;
      audio.volume = 0;
      const fadeIn = setInterval(() => {
        if (volume < 0.9) {
          volume += 0.1;
          audio.volume = Math.min(1, volume);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:left-10 z-[100] w-12 md:w-16 flex flex-col items-center">
      <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
        {/* Divine Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r="38%"
            className="stroke-primary/10 fill-none"
            strokeWidth="2"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="38%"
            className="stroke-primary fill-none"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(198,167,94,0.4)" }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="w-12 h-12 md:w-16 md:h-16 bg-temple-dark/80 backdrop-blur-xl border border-primary/30 text-primary rounded-full flex items-center justify-center shadow-2xl z-10 hover:border-primary transition-colors"
        >
          {isPlaying ? (
            <div className="relative">
              <Music className="w-5 h-5 md:w-7 md:h-7 animate-pulse" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary rounded-full blur-md -z-10"
              />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 md:w-7 md:h-7 opacity-60" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

const EmergencyContactToggle = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const contacts = [
    { name: t('interactive.medical'), number: "108", icon: <HeartPulse className="w-4 h-4" /> },
    { name: t('interactive.police'), number: "112", icon: <ShieldAlert className="w-4 h-4" /> },
    { name: t('interactive.helpdesk'), number: "98452 42167", icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[100] w-12 md:w-16 flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 bg-temple-dark/95 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.3)] min-w-[260px] origin-bottom-right"
          >
            <h3 className="font-heading text-xs font-bold text-red-400 uppercase tracking-widest mb-3 pb-2 border-b border-red-500/20 text-center">
              {t('interactive.emergencyHeader')}
            </h3>
            <div className="flex flex-col gap-2">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.number.replace(/\s+/g, '')}`}
                  className="flex flex-col gap-1 p-3 rounded-xl bg-black/40 hover:bg-red-500/10 border border-primary/10 hover:border-red-500/30 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between text-foreground">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 group-hover:text-red-400 transition-colors flex items-center gap-2">
                      <span className="p-1.5 bg-red-500/10 rounded-full text-red-500/80 group-hover:text-red-400 group-hover:bg-red-500/20 transition-colors">
                        {contact.icon}
                      </span>
                      {contact.name}
                    </span>
                  </div>
                  <span className="font-heading text-lg font-black text-primary pl-9 group-hover:text-primary transition-colors">
                    {contact.number}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl z-10 transition-colors border ${
          isOpen ? "bg-red-500/20 border-red-500 text-red-500" : "bg-temple-dark/80 backdrop-blur-xl border-red-500/30 text-red-400 hover:border-red-500"
        }`}
        aria-label="Emergency Contacts"
      >
        <Phone className={`w-5 h-5 md:w-7 md:h-7 ${!isOpen && "animate-pulse"}`} />
      </motion.button>
    </div>
  );
};

export { AudioToggle, EmergencyContactToggle };
