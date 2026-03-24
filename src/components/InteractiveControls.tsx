import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import govindaMusic from "@/assets/govinda-namavali.mp3";


const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(govindaMusic)); // Local devotional music

  useEffect(() => {
    audio.loop = true;
    return () => audio.pause();
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("User interaction required for audio"));
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className="fixed bottom-10 left-10 z-50 flex gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="w-14 h-14 bg-temple-dark/80 backdrop-blur-md border border-primary text-primary rounded-full flex items-center justify-center shadow-lg"
      >
        {isPlaying ? <Music className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export { AudioToggle };
