import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, HeartHandshake, Users, AlertTriangle, Info, Phone, ClipboardList } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const SevasGuidelines = () => {
  const { ref, isInView, divineVariant } = useScrollReveal();
  const { t } = useTranslation();

  const sevas = [
    {
      title: t('sevasGuidelines.card1Title'),
      icon: <Coins className="w-8 h-8 md:w-12 md:h-12 text-[#FF9933]" />,
      description: t('sevasGuidelines.card1Desc'),
      contact: null
    },
    {
      title: t('sevasGuidelines.card2Title'),
      icon: <HeartHandshake className="w-8 h-8 md:w-12 md:h-12 text-[#FF9933]" />,
      description: t('sevasGuidelines.card2Desc'),
      contact: "9845242167"
    },
    {
      title: t('sevasGuidelines.card3Title'),
      icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-[#FF9933]" />,
      description: t('sevasGuidelines.card3Desc'),
      contact: "9964578732 / 9892012060"
    }
  ];

  return (
    <section id="sevas" className="py-6 md:py-8 bg-temple-deep relative overflow-hidden optimize-gpu" ref={ref}>
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divineVariant}
          className="text-center mb-6 md:mb-10"
        >
          <p 
            className="font-body text-[#FF9933] text-sm md:text-lg tracking-[0.3em] uppercase font-bold mb-2 md:mb-3"
          >
            {t('sevasGuidelines.tagline')}
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-black text-gradient-gold uppercase">
            {t('sevasGuidelines.title')}
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full px-6 md:px-12">
        {/* Sevas Offered - Full Width Bulletproof Seamless Marquee */}
        <div className="relative overflow-hidden w-full flex mb-6 md:mb-12">
          {/* Elegant Gradient Fades */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-60 bg-gradient-to-r from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-60 bg-gradient-to-l from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-25%"] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="flex shrink-0 py-10"
          >
            {[...sevas, ...sevas, ...sevas, ...sevas].map((seva, index) => (
              <div key={index} className="pr-6 md:pr-10 shrink-0">
                <motion.div
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 15px 30px -10px rgba(198,167,94,0.2)"
                  }}
                  className="w-[220px] md:w-[280px] bg-card/40 backdrop-blur-xl border border-primary/20 rounded-[28px] md:rounded-[36px] p-5 md:p-6 text-center group hover:border-primary/40 transition-all duration-300 shadow-glow relative overflow-hidden flex flex-col items-center min-h-[260px] md:min-h-[340px]"
                  style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')" }}
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-5 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                      <span className="text-sm md:text-xl font-heading font-black">ॐ</span>
                    </div>
                    
                    <h3 className="font-heading text-xs md:text-xl font-bold text-foreground mb-1 md:mb-2 leading-tight md:leading-normal relative z-10 whitespace-normal text-center line-clamp-2 uppercase tracking-wide">
                      {seva.title}
                    </h3>
                    
                    <p className="font-body text-[9px] md:text-sm uppercase tracking-wider text-primary/60 font-black relative z-10 whitespace-normal text-center line-clamp-4">
                      {seva.description}
                    </p>
                  </div>

                  {seva.contact && (
                    <div className="relative z-10 w-full pt-3 mt-auto">
                      <a 
                        href={`tel:${seva.contact.split(' / ')[0].replace(/\s/g, '')}`}
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="font-heading font-black tracking-widest uppercase text-[9px] md:text-xs">
                          {seva.contact}
                        </span>
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SevasGuidelines;
