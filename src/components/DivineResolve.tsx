import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const DivineResolve = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-20 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,183,0,0.08)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative inline-block mb-4 group px-8 py-4">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />
            
            <span className="absolute -inset-2 md:-inset-6 bg-primary/10 blur-[40px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h3 className="font-heading text-2xl md:text-5xl lg:text-6xl font-black text-gradient-gold leading-tight relative z-10 drop-shadow-[0_0_15px_rgba(255,183,0,0.4)]">
              {t('divine.name')}
            </h3>
          </div>
          
          <p className="font-body text-primary/80 text-base md:text-xl italic mb-8 tracking-wide">
            {t('divine.resolve')}
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-[28px] md:rounded-[32px] p-6 md:p-8 backdrop-blur-sm relative overflow-hidden mb-8 group hover:border-primary/40 transition-all duration-500 max-w-3xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <h4 className="font-heading text-base md:text-xl font-black text-primary uppercase tracking-[0.2em] mb-3">
              {t('divine.devasthanam')}
            </h4>
            
            <div className="relative inline-block mt-2">
              <span className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black text-gradient-gold uppercase tracking-tighter relative z-10">
                {t('divine.quote')}
              </h2>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-primary/20" />
            <span className="text-primary/40 font-heading text-sm">ॐ</span>
            <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-primary/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DivineResolve;
