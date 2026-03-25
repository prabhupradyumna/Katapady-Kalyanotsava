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
  const { ref, isInView, divineVariant } = useScrollReveal();

  return (
    <section id="about" className="py-6 md:py-10 relative overflow-hidden optimize-gpu" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 mb-4">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divineVariant}
        >
          <p className="font-body text-primary text-sm md:text-lg tracking-widest uppercase mb-2">
            ✦ The Divine Lord ✦
          </p>
          <h2 className="font-heading text-xl md:text-3xl font-bold text-gradient-gold">
            About Sri Venkateswara
          </h2>
          <p className="font-body text-sm md:text-base text-foreground/60 mt-2 max-w-3xl mx-auto leading-relaxed">
            Lord Sri Venkateswara, also known as Balaji, Govinda, and Srinivasa, resides atop the
            sacred seven hills of Tirumala. He is the most worshipped deity in the Hindu pantheon,
            drawing millions of devotees each year seeking His divine grace.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full px-6 md:px-12 py-2">
        <div className="relative">
          {/* Elegant Gradient Fades for Carousel Edges - Using correct background color */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-60 bg-gradient-to-r from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-60 bg-gradient-to-l from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />
          
          <div className="relative overflow-hidden w-full flex">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 md:gap-8 whitespace-nowrap px-4"
            >
            {[...cards, ...cards].map((card, i) => (
              <div
                key={i}
                className="w-[240px] md:w-[280px] inline-flex py-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 15px 30px -10px rgba(198,167,94,0.2)"
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ 
                    y: {
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                      delay: i * 0.5
                    },
                    scale: { duration: 0.3 }
                  }}
                  className="group bg-card/10 backdrop-blur-xl border border-primary/10 hover:border-primary/40 rounded-[1.5rem] p-4 md:p-6 text-center transition-all duration-500 shadow-divine relative overflow-hidden flex flex-col w-full h-full min-h-[240px] md:min-h-[300px] whitespace-normal"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                    <card.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  
                  <div className="relative z-10 flex-grow">
                    <h3 className="font-heading text-base md:text-xl font-black text-primary mb-2 uppercase tracking-wider drop-shadow-sm">{card.title}</h3>
                    <p className="font-body text-[10px] md:text-sm text-foreground/70 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
