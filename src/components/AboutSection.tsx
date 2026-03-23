import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Sun, Sparkles, Shield } from "lucide-react";

const cards = [
  {
    icon: Sun,
    title: "The Preserver",
    description: "Lord Venkateswara is an incarnation of Lord Vishnu, the supreme preserver of the universe.",
  },
  {
    icon: Heart,
    title: "Boundless Grace",
    description: "He bestows unconditional love and grace upon all devotees who seek His divine blessings.",
  },
  {
    icon: Sparkles,
    title: "Kaliyuga Varada",
    description: "The Lord who grants boons in the age of Kali, guiding humanity through darkness to light.",
  },
  {
    icon: Shield,
    title: "Eternal Dharma",
    description: "His presence at Tirumala upholds the eternal principles of righteousness and devotion.",
  },
];

// Using a custom lotus-like icon since lucide doesn't have Lotus
const LotusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 21c0-6-4-10-8-12 4 0 8 2 8 6 0-4 4-6 8-6-4 2-8 6-8 12z" />
    <path d="M12 21c0-4-2.5-7-5-9 2.5.5 5 3 5 5 0-2 2.5-4.5 5-5-2.5 2-5 5-5 9z" />
  </svg>
);

const AboutSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-primary text-lg tracking-widest uppercase mb-3">
            ✦ The Divine Lord ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            About Sri Venkateswara
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/60 mt-4 max-w-3xl mx-auto leading-relaxed">
            Lord Sri Venkateswara, also known as Balaji, Govinda, and Srinivasa, resides atop the
            sacred seven hills of Tirumala. He is the most worshipped deity in the Hindu pantheon,
            drawing millions of devotees each year seeking His divine grace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group bg-card border border-border hover:border-primary/40 rounded-xl p-6 md:p-8 text-center transition-all duration-500 hover:glow-gold"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{card.title}</h3>
              <p className="font-body text-foreground/60 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
