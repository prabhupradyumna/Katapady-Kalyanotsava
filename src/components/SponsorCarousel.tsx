import { motion } from "framer-motion";

const sponsors = [
  { name: "Katapadi Pai Family", logo: "/sponsors/katpadi-family.jpg" },
  { name: "SVS Vidyavardhaka Sangha", logo: "/sponsors/svs.jpg" },
  { name: "Adyar Petrol Pump", logo: "/sponsors/hp.png" },
  { name: "Sun Matrix Audio Lab", logo: "/sponsors/sun-matrix.jpg" },
  { name: "Invenger Technologies", logo: "/sponsors/invenger.png" },
  { name: "Vijaya Industries", logo: "/sponsors/vijaya.jpg" },
  { name: "Iratha Auto", logo: "/sponsors/iratha.png" }
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

      <div className="flex relative items-center mt-8">
        {/* Double carousel for seamless loop */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-center items-center"
        >
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={i}
              className="px-10 py-6 min-h-[180px] bg-card border border-primary/30 rounded-2xl flex flex-col items-center justify-center min-w-[320px] shadow-divine group hover:border-primary transition-all duration-300 transform hover:-translate-y-2 gap-4 will-change-transform"
            >
              {sponsor.logo && (
                <div className="h-28 w-full flex items-center justify-center bg-white rounded-xl p-4 shadow-inner">
                  <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
              )}
              <p className="font-heading text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors text-center drop-shadow-md tracking-wide">
                {sponsor.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorCarousel;
