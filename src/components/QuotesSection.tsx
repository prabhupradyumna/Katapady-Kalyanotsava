import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const quotes = [
  {
    sanskrit: "ॐ नमो वेंकटेशाय",
    transliteration: "Om Namo Venkatesaya",
    meaning: "Salutations to Lord Venkateswara, the supreme Lord of the Seven Hills.",
  },
  {
    sanskrit: "श्रीनिवासं परं ब्रह्म सर्वलोकैकनायकम्",
    transliteration: "Srinivasam Param Brahma Sarvalokaikam Nayakam",
    meaning: "Srinivasa is the Supreme Brahman, the sole leader of all worlds.",
  },
  {
    sanskrit: "वेंकटेश: सदा रक्षतु",
    transliteration: "Venkateshaha Sada Rakshatu",
    meaning: "May Lord Venkateswara always protect us with His divine grace.",
  },
  {
    sanskrit: "गोविंदा गोविंदा श्री वेंकटेश गोविंदा",
    transliteration: "Govinda Govinda Sri Venkatesa Govinda",
    meaning: "Hail Govinda! The divine call that echoes through the hills of Tirumala.",
  },
];

const QuotesSection = () => {
  const { ref, isInView } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="quotes" className="py-24 md:py-32 bg-sacred-gradient relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-primary text-lg tracking-widest uppercase mb-3">
            ✦ Sacred Verses ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            Slokas & Mantras
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="font-heading text-3xl md:text-5xl text-primary mb-4 leading-relaxed">
                {quotes[current].sanskrit}
              </p>
              <p className="font-body text-lg md:text-xl text-foreground/50 italic mb-6">
                {quotes[current].transliteration}
              </p>
              <p className="font-body text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                "{quotes[current].meaning}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-8" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`View quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
