import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link as LinkIcon, MessageCircle, Music, VolumeX, Bell } from "lucide-react";
import { toast } from "sonner";

const SocialShare = () => {
  const shareUrl = window.location.href;
  const shareText = "Witness the Divine Sri Srinivasa Kalyanotsava at Katapadi on 11 April 2026. Join the celestial union!";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const whatsappShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4 group">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={whatsappShare}
            className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            <LinkIcon className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <motion.button
        whileHover={{ rotate: 180, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,183,0,0.5)] z-20"
      >
        <Share2 className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")); // Placeholder for temple music

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

  const playBell = () => {
    const bellColor = new Audio("https://actions.google.com/sounds/v1/alarms/temple_bell.ogg");
    bellColor.play().catch(e => console.log("User interaction required for audio"));
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
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={playBell}
        className="w-14 h-14 bg-temple-dark/80 backdrop-blur-md border border-primary text-primary rounded-full flex items-center justify-center shadow-lg"
      >
        <Bell className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export { SocialShare, AudioToggle };
