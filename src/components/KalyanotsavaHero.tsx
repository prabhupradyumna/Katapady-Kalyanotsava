import { motion } from "framer-motion";
import heroImage from "@/assets/hero-kalyanotsava.png";

const KalyanotsavaHero = () => {
  return (
    <section id="home" className="relative h-[65vh] md:h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-temple-deep">
      
      {/* Background Layers for Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Layer 1: Base Dark Gradient */}
        <div className="absolute inset-0 bg-temple-deep" />
        
        {/* Layer 2: Subtle Animated Mandala Background */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] opacity-[0.05] pointer-events-none"
        >
          <div className="w-full h-full border-[1px] border-primary rounded-full" />
          <div className="absolute inset-[10%] border-[1px] border-primary/40 rounded-full" />
          <div className="absolute inset-[20%] border-[2px] border-primary/20 rounded-full border-dashed" />
        </motion.div>

        {/* Layer 3: Main Deity Cinematic Image */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.85 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 z-10"
        >
          <img
            src={heroImage}
            alt="Lord Srinivasa with Consorts"
            className="w-full h-full object-cover object-center contrast-[1.1] brightness-[0.9]"
          />
        </motion.div>

        {/* Ambient Glow behind Deity */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[70vw] h-[70vw] rounded-full bg-primary/20 blur-[180px]"
          />
        </div>

        {/* Dynamic Atmospheric Overlays */}
        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-temple-black/60 via-transparent to-temple-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-temple-black/40 via-transparent to-temple-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(24,25,4,0.5)_100%)]" />
        </div>
      </div>

      {/* Cinematic Focused Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: (i * 10) + "%" }}
            animate={{ 
              opacity: [0, 0.4, 0],
              x: (i * 10 + 5) + "%",
              height: ["400px", "600px", "500px"]
            }}
            transition={{ 
              duration: 10 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 2 
            }}
            className="absolute top-[-100px] w-[2px] bg-gradient-to-b from-primary/60 via-primary/10 to-transparent rotate-[25deg] blur-[2px]"
          />
        ))}
      </div>

      {/* Floating Sparkles (Foreground Layer) */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: ["100%", "0%"],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Hero Content (Floating on top) */}
      <div className="relative z-50 text-center px-6 max-w-6xl mx-auto translate-y-[-5%] md:translate-y-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="space-y-8 md:space-y-10 mt-20"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-body text-primary text-xs md:text-lg uppercase tracking-[0.4em] md:tracking-[0.6em] font-semibold glow-soft"
          >
            ✦ Loakakalyanartha ✦
          </motion.p>
          
          <h1 className="font-heading text-3xl md:text-5xl lg:text-5xl font-black text-gradient-gold leading-normal md:leading-normal text-shadow-premium drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] px-4">
            Sri Srinivasa<br/>Kalyanotsava
          </h1>
          
          <div className="relative inline-block py-1 px-4">
            <p className="font-body text-sm md:text-lg text-foreground/80 max-w-4xl mx-auto italic tracking-wide text-shadow-premium">
              Step into the sacred union of divinity and grace
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="absolute bottom-0 left-[30%] right-[30%] h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 pt-10 md:pt-14">
            {/* Date Selection */}
            <div className="md:pr-14 md:border-r border-primary/20 text-center md:text-right">
              <p className="font-heading text-base md:text-lg text-foreground tracking-[0.3em] uppercase mb-1 font-bold opacity-90 drop-shadow-lg">Saturday</p>
              <p className="font-heading text-3xl md:text-5xl text-foreground font-black tracking-tighter drop-shadow-2xl">11 April 2026</p>
            </div>
            
            {/* Location Selection */}
            <div className="md:pl-14 text-center md:text-left mt-6 md:mt-0">
              <p className="font-heading text-base md:text-lg text-foreground tracking-[0.3em] uppercase mb-1 font-bold opacity-90 drop-shadow-lg">Katapadi, Udupi</p>
              <p className="font-heading text-2xl md:text-4xl text-foreground font-black tracking-tight drop-shadow-2xl">S.V.S. Ground</p>
              <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">✦ Sacred Venue ✦</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-[1em] text-primary font-black mb-4 ml-[1em]">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary via-primary/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default KalyanotsavaHero;
