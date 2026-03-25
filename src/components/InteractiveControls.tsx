import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import govindaMusic from "@/assets/govinda-namavali.mp3";

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
    <div className="fixed bottom-6 right-6 md:bottom-10 md:left-10 z-[100]">
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
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

export { AudioToggle };
