import { motion } from "framer-motion";
import { Sparkles, Heart, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const EventTimeline = () => {
  const { t } = useTranslation();

  const eventItems = [
    {
      time: t('timeline.time1'),
      title: t('timeline.title1'),
      description: t('timeline.desc1'),
      icon: Sparkles
    },
    {
      time: t('timeline.time2'),
      title: t('timeline.title2'),
      description: t('timeline.desc2'),
      icon: Sparkles
    },
    {
      time: t('timeline.time3'),
      title: t('timeline.title3'),
      description: t('timeline.desc3'),
      icon: Heart
    },
    {
      time: t('timeline.time4'),
      title: t('timeline.title4'),
      description: t('timeline.desc4'),
      icon: CheckCircle
    }
  ];

  const specialNotes = [
    t('timeline.note1'),
    t('timeline.note2'),
    t('timeline.note3'),
    t('timeline.note4'),
    t('timeline.note5')
  ];

  return (
    <section id="schedule" className="py-8 md:py-16 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-8 md:mb-12">
          <p className="font-body text-primary text-sm md:text-base uppercase tracking-[0.2em] mb-2 font-semibold">
            {t('timeline.tagline')}
          </p>
          <h2 className="font-heading text-2xl md:text-5xl font-black text-gradient-gold">
            {t('timeline.title')}
          </h2>
          <p className="font-body text-foreground/60 text-sm md:text-base mt-2">{t('timeline.date')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
          {eventItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/20 backdrop-blur-xl border border-primary/20 p-5 md:p-8 rounded-[24px] hover:border-primary/40 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <div className="p-3 md:p-4 bg-primary/10 rounded-xl md:rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <item.icon className="w-6 h-6 md:w-10 md:h-10" />
                </div>
                <div>
                  <h4 className="font-heading text-sm md:text-xl font-black text-primary mb-1 md:mb-2 uppercase tracking-wider">
                    {item.time}
                  </h4>
                  <h3 className="font-heading text-base md:text-2xl font-bold text-foreground mb-2 md:mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs md:text-base text-foreground/60 leading-relaxed italic">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Notes Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[32px] p-6 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <h3 className="font-heading text-lg md:text-2xl font-black text-primary uppercase tracking-[0.2em] mb-6 text-center">
            {t('timeline.specialNotesTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {specialNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 glow-primary" />
                <p className="font-body text-xs md:text-sm text-foreground/70 leading-relaxed italic">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventTimeline;
