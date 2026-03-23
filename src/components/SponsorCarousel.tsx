import { motion } from "framer-motion";

const sponsors = [
  "Invenger Technologies",
  "Vijaya Industries",
  "Iratha Auto",
  "Katapadi Pai Family",
  "SVS Vidyavardhaka Sangha",
  "Adyar Petrol Pump",
  "Sun Matrix Audio Lab"
];

const SponsorCarousel = () => {
  return (
    <section className="py-8 bg-temple-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,183,0,0.05)_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-temple-black via-transparent to-temple-black z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-body text-primary text-xl uppercase tracking-widest mb-4 font-semibold"
        >
          ✦ Patronage ✦
        </motion.p>
        <h2 className="font-heading text-4xl m:text-6xl font-bold text-gradient-gold">
          Grace Supported By
        </h2>
      </div>

      <div className="flex relative items-center">
        {/* Double carousel for seamless loop */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-center items-center"
        >
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={i}
              className="px-12 py-8 bg-card/60 backdrop-blur-md border border-primary/20 rounded-2xl flex items-center justify-center min-w-[300px] shadow-divine group hover:border-primary transition-all duration-300 transform hover:-translate-y-2"
            >
              <p className="font-heading text-2xl font-bold text-foreground/70 group-hover:text-primary transition-colors italic">
                {sponsor}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorCarousel;
