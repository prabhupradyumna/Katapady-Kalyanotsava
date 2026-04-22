import { motion } from "framer-motion";
import { Play } from "lucide-react";

const SoulfulJourneyVideo = () => {
  return (
    <section id="soulful-journey" className="relative pt-0 md:pt-4 pb-12 md:pb-24 bg-temple-deep overflow-hidden flex flex-col items-center">

      {/* Decorative background elements to match the theme blend */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-temple-black to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-temple-black to-transparent z-10" />
        
        {/* Subtle radial glow behind the video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-4 md:mb-8"
        >
          <div className="h-[1px] w-8 md:w-24 bg-primary/30" />
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="w-4 h-4 md:w-5 md:h-5 text-primary/80 drop-shadow-glow fill-primary/20 relative z-10" />
          </div>
          <span className="font-heading text-primary text-[10px] md:text-sm font-bold uppercase tracking-[0.5em] glow-soft">Soulful Journey</span>
          <div className="h-[1px] w-8 md:w-24 bg-primary/30" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full max-w-5xl relative group"
        >
          {/* Main Video Container with Premium Framing */}
          <div className="relative aspect-video rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-700 bg-black">
            {/* Inner aesthetic reflections */}
            <div className="absolute inset-0 z-10 pointer-events-none border-[1px] border-white/5 rounded-xl md:rounded-[2.5rem]" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30" />
            
            <iframe 
              className="w-full h-full relative z-0"
              src="https://www.youtube.com/embed/apMCa1q0pnc?si=sr8o-QU0v9nzII3h" 
              title="Soulful Journey of Srinivasa Kalyanotsava" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Sophisticated Ambient glow below video */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[85%] h-24 bg-primary/10 blur-[100px] pointer-events-none -z-10 opacity-70 group-hover:bg-primary/20 transition-all duration-700" />
          
          {/* Decorative Corners for a "Temple" feel */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-xl pointer-events-none" />
        </motion.div>
        
        {/* Caption/Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 font-body text-[10px] md:text-xs text-primary/60 uppercase tracking-[0.3em] font-medium text-center max-w-md"
        >
          Witness the divinity and grandeur of the sacred wedding rituals
        </motion.p>
      </div>
    </section>
  );
};

export default SoulfulJourneyVideo;
