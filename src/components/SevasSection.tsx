import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, Flame, Music, Star, Gem, Flower2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const SevasSection = () => {
  const { ref, isInView } = useScrollReveal();
  const { t } = useTranslation();

  const sevas = [
    { icon: Star, name: t('sevas.name1'), time: t('sevas.time1'), description: t('sevas.desc1') },
    { icon: Flame, name: t('sevas.name2'), time: t('sevas.time2'), description: t('sevas.desc2') },
    { icon: Clock, name: t('sevas.name3'), time: t('sevas.time3'), description: t('sevas.desc3') },
    { icon: Music, name: t('sevas.name4'), time: t('sevas.time4'), description: t('sevas.desc4') },
    { icon: Gem, name: t('sevas.name5'), time: t('sevas.time5'), description: t('sevas.desc5') },
    { icon: Flower2, name: t('sevas.name6'), time: t('sevas.time6'), description: t('sevas.desc6') },
  ];

  return (
    <section id="sevas" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-primary text-lg tracking-widest uppercase mb-3">
            {t('sevas.tagline')}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            {t('sevas.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sevas.map((seva, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group bg-card border border-border hover:border-primary/40 rounded-xl p-6 transition-all duration-500 hover:glow-gold cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <seva.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{seva.name}</h3>
                  <p className="font-body text-sm text-primary/80 mt-0.5">{seva.time}</p>
                  <p className="font-body text-foreground/60 mt-2 leading-relaxed">{seva.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SevasSection;
