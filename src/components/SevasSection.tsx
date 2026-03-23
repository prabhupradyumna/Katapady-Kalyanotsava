import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, Flame, Music, Star, Gem, Flower2 } from "lucide-react";

const sevas = [
  { icon: Star, name: "Suprabhatam", time: "3:00 AM", description: "The divine awakening of the Lord with sacred Vedic hymns." },
  { icon: Flame, name: "Thomala Seva", time: "5:00 AM", description: "Adorning the deity with fragrant flower garlands." },
  { icon: Clock, name: "Archana", time: "6:30 AM", description: "Offering sacred prayers with the chanting of 108 divine names." },
  { icon: Music, name: "Sahasra Deepalankarana", time: "7:00 PM", description: "Illumination of the sanctum with a thousand lamps." },
  { icon: Gem, name: "Kalyanotsavam", time: "9:00 AM", description: "The celestial wedding ceremony of the divine couple." },
  { icon: Flower2, name: "Ekanta Seva", time: "10:00 PM", description: "The final nighttime offering before the Lord retires." },
];

const SevasSection = () => {
  const { ref, isInView } = useScrollReveal();

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
            ✦ Daily Worship ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            Sevas & Rituals
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sevas.map((seva, i) => (
            <motion.div
              key={seva.name}
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
