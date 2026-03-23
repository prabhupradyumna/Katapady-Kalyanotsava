import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, HandHeart, Building2 } from "lucide-react";

const options = [
  { icon: Heart, title: "Hundi Offering", description: "Contribute to the sacred Hundi with your heartfelt offering.", cta: "Offer Now" },
  { icon: HandHeart, title: "Anna Daanam", description: "Feed thousands of devotees through the sacred tradition of Anna Daanam.", cta: "Feed Devotees" },
  { icon: Building2, title: "Temple Restoration", description: "Support the preservation and restoration of ancient temple architecture.", cta: "Contribute" },
];

const DonationSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="donate" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-primary text-lg tracking-widest uppercase mb-3">
            ✦ Serve the Divine ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            Contribute & Support
          </h2>
          <p className="font-body text-lg text-foreground/60 mt-4 max-w-2xl mx-auto">
            Your generous contributions help sustain the ancient traditions and serve millions of devotees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group bg-card border border-border rounded-xl p-8 text-center hover:border-primary/40 transition-all duration-500 hover:glow-gold flex flex-col"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <opt.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{opt.title}</h3>
              <p className="font-body text-foreground/60 leading-relaxed mb-6 flex-1">{opt.description}</p>
              <button className="w-full py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg hover:scale-105 transition-transform duration-300 glow-gold">
                {opt.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
