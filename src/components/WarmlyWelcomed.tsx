import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WarmlyWelcomed = () => {
  const { ref, isInView, divineVariant } = useScrollReveal();

  return (
    <section className="py-4 md:py-6 bg-temple-deep overflow-hidden optimize-gpu" ref={ref}>
      <div className="w-full relative z-20">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divineVariant}
          className="container mx-auto px-4 text-center mb-4 md:mb-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-3"
          >
            <span className="font-heading text-primary text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Coordination</span>
          </motion.div>
          <h3 className="font-heading text-xl md:text-3xl font-black text-gradient-gold uppercase">
            Warmly Welcomed By
          </h3>
        </motion.div>

        <div className="relative w-full px-6 md:px-12">
          <div className="relative">
            {/* Elegant Gradient Fades - Uniform width with About section */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-60 bg-gradient-to-r from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-60 bg-gradient-to-l from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />

            <div className="relative overflow-hidden w-full flex">
              <motion.div
                animate={{ x: ["0%", "-25%"] }}
                transition={{ 
                  duration: 35, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop"
                }}
                className="flex shrink-0 py-4 md:py-6"
              >
              {[
                { name: "K. Sathyendra Pai & K. Krishna Mohan Pai USA", role: "Primary Patrons" },
                { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" },
                { name: "GSB Community Udupi", role: "Community Coordination" },
                { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" }
              ].concat(
                { name: "K. Sathyendra Pai & K. Krishna Mohan Pai USA", role: "Primary Patrons" },
                { name: "GSB Community Udupi", role: "Community Coordination" },
                { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" },
                { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" }
              ).map((org, index) => (
                <div key={index} className="pr-6 md:pr-8 shrink-0">
                  <motion.div
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      boxShadow: "0 15px 30px -10px rgba(198,167,94,0.2)"
                    }}
                    className="bg-card/40 backdrop-blur-xl border border-primary/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-center group hover:border-primary/40 transition-all duration-300 shadow-glow hover:bg-card/50 relative overflow-hidden flex flex-col justify-center min-w-[180px] md:min-w-[240px]"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-5 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                      <span className="text-sm md:text-xl font-heading font-black">ॐ</span>
                    </div>
                    <h4 className="font-heading text-xs md:text-xl font-bold text-foreground mb-1 md:mb-2 leading-tight md:leading-normal relative z-10 whitespace-normal">
                      {org.name}
                    </h4>
                    <p className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-primary/60 font-black relative z-10 whitespace-normal">
                      {org.role}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default WarmlyWelcomed;
