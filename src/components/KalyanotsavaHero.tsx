import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-kalyanotsava-new.jpg";
import mandalaPattern from "@/assets/mandala-pattern.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

const KalyanotsavaHero = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const mandalaY = useTransform(scrollY, [0, 500], [0, 150]);
  const deityY = useTransform(scrollY, [0, 500], [0, 100]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Adaptive counts for performance optimization
  const rayCount = isMobile ? 6 : 12;
  const sparkleCount = isMobile ? 12 : 30;

  return (
    <section id="home" className="relative h-auto md:h-screen min-h-[500px] md:min-h-[600px] flex flex-col md:items-center md:justify-center overflow-hidden bg-temple-deep optimize-gpu">
      
      {/* Background Layers for Depth */}
      <div className="relative md:absolute md:inset-0 z-0 overflow-hidden w-full aspect-[16/11] md:aspect-auto">
        {/* Layer 1: Base Dark Gradient */}
        <div className="absolute inset-0 bg-temple-deep" />
        
        {/* Layer 2: Rotating Mandala Background with Parallax */}
        <motion.div 
          style={{ y: mandalaY }}
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[100vw] md:h-[100vw] opacity-[0.07] pointer-events-none will-change-transform"
        >
          <img 
            src={mandalaPattern} 
            alt="" 
            className="w-full h-full object-contain mix-blend-screen"
          />
        </motion.div>

        {/* Layer 3: Main Deity Cinematic Image with Parallax */}
        <motion.div
          style={{ y: isMobile ? 0 : deityY }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 z-10 will-change-transform"
        >
          <img
            src={heroImage}
            alt="Lord Srinivasa with Consorts"
            className="w-full h-full object-cover object-center md:object-top contrast-[1.1] brightness-[1.1] md:brightness-[1.0] opacity-100"
          />
        </motion.div>

        {/* Ambient Glow behind Deity - Optimized blur for performance */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[120px] will-change-transform translate-z-0"
          />
        </div>

        {/* Dynamic Atmospheric Overlays - Enhanced darkness for text legibility */}
        <div className="absolute inset-0 z-20">
          {/* Mobile Overlay */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-temple-black/40 via-transparent to-temple-black/80" />
          <div className="md:hidden absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-temple-black via-temple-black/60 to-transparent" />
          
          {/* Desktop Overlay (Restored) */}
          <div className="hidden md:block absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-temple-black via-temple-black/40 to-temple-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-temple-black/60 via-transparent to-temple-black/60" />
            <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-temple-deep via-temple-deep/90 to-transparent" />
          </div>
        </div>
      </div>

      {/* Cinematic Focused Light Rays - Adaptive count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 opacity-30">
        {[...Array(rayCount)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: (i * (100/rayCount)) + "%" }}
            animate={{ 
              opacity: [0, 0.3, 0],
              x: (i * (100/rayCount) + 5) + "%",
              height: ["400px", "600px", "500px"]
            }}
            transition={{ 
              duration: 10 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 2 
            }}
            className="absolute top-[-100px] w-[1px] bg-gradient-to-b from-primary/40 via-primary/5 to-transparent rotate-[25deg] blur-[3px] will-change-transform translate-z-0"
          />
        ))}
      </div>

      {/* Floating Sparkles (Foreground Layer) - Adaptive count */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        {[...Array(sparkleCount)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: ["100%", "0%"],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px] will-change-transform translate-z-0"
          />
        ))}
      </div>

      {/* Hero Content (Floating on top) */}
      <motion.div 
        style={{ y: isMobile ? 0 : contentY, opacity: isMobile ? 1 : opacity }}
        className="relative md:absolute md:inset-0 z-50 text-center px-6 max-w-6xl mx-auto flex flex-col justify-center py-10 md:py-0 md:pt-12"
      >
        {/* Added radial shadow for better text contrast */}
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[70%] -z-10 pointer-events-none blur-3xl scale-150 opacity-80"
          style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="space-y-4 md:space-y-6"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-body text-primary text-xs md:text-base uppercase tracking-[0.4em] md:tracking-[0.6em] font-semibold glow-soft"
          >
            {t('hero.lokakalyanartha')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mb-2 md:mb-4"
          >
            <span className="font-heading text-[10px] md:text-xs text-primary/80 uppercase tracking-[0.3em] font-bold">
              {t('hero.piousResolve')}
            </span>
            <h2 className="font-heading text-base md:text-2xl text-gradient-gold font-bold mt-1 py-1 leading-normal drop-shadow-glow">
              {t('hero.family')}
            </h2>
          </motion.div>
          
          <h1 className="font-heading text-3xl md:text-5xl lg:text-7xl font-black text-gradient-gold leading-[1.3] md:leading-[1.4] py-2 md:py-4 text-shadow-premium drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] px-4">
            {t('hero.title1')}<br className="hidden md:block"/> {t('hero.title2')}
          </h1>
          
          <div className="relative inline-block py-1 px-4">
            <p className="font-body text-sm md:text-lg text-foreground/80 max-w-4xl mx-auto italic tracking-wide text-shadow-premium">
              {t('hero.subtitle')}
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-0 pt-4 md:pt-8">
            {/* Date Selection */}
            <div className="w-full md:w-auto md:pr-10 md:border-r border-primary/20 text-center md:text-right">
              <p className="font-heading text-sm md:text-base text-foreground tracking-[0.3em] uppercase mb-1 font-bold opacity-90 drop-shadow-lg">{t('hero.day')}</p>
              <h3 className="text-2xl md:text-4xl text-foreground font-black drop-shadow-2xl tracking-tight">
                <span className="font-heading">{t('hero.month')} </span>
                <span className="font-body tabular-nums">{t('hero.date')}</span>
              </h3>
              <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">{t('hero.lagnam')}</p>
            </div>
            
            {/* Location Selection */}
            <div className="w-full md:w-auto md:pl-10 text-center md:text-left mt-2 md:mt-0">
              <p className="font-heading text-sm md:text-base text-foreground tracking-[0.3em] uppercase mb-1 font-bold opacity-90 drop-shadow-lg">{t('hero.city')}</p>
              <h3 className="font-heading text-2xl md:text-4xl text-foreground font-black tracking-tight drop-shadow-2xl">{t('hero.venue')}</h3>
              <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">{t('hero.sacredVenue')}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default KalyanotsavaHero;
