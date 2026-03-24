import { motion } from "framer-motion";

const WarmlyWelcomed = () => {
  return (
    <section className="py-8 md:py-12 bg-temple-deep overflow-hidden">
      <div className="w-full relative z-20">
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4"
          >
            <span className="font-heading text-primary text-sm uppercase tracking-[0.3em] font-bold">Coordination</span>
          </motion.div>
          <h3 className="font-heading text-3xl md:text-5xl font-black text-gradient-gold uppercase">
            Warmly Welcomed By
          </h3>
        </div>

        <div className="relative w-full px-6 md:px-12">
          <div className="relative">
            {/* Elegant Gradient Fades for a Premium Look - Uniform with other sections */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-gradient-to-r from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-80 bg-gradient-to-l from-temple-deep via-temple-deep/90 to-transparent z-40 pointer-events-none" />

            <div className="relative overflow-hidden w-full flex">
              {/* Bulletproof Seamless Marquee */}
              <motion.div
                animate={{ x: ["0%", "-25%"] }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop"
                }}
                className="flex shrink-0 py-12"
              >
              {[
                { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" },
                { name: "Katapady Pai Family", role: "Devotional Patronage" },
                { name: "GSB Community Udupi", role: "Community Coordination" },
                { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" }
              ].concat(
                { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" },
                { name: "Katapady Pai Family", role: "Devotional Patronage" },
                { name: "GSB Community Udupi", role: "Community Coordination" },
                { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" },
                { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" },
                { name: "Katapady Family", role: "Devotional Patronage" },
                { name: "GSB Community Udupi", role: "Community Coordination" },
                { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" },
                { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" },
                { name: "Katapady Pai Family", role: "Devotional Patronage" },
                { name: "GSB Community Udupi", role: "Community Coordination" },
                { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" }
              ).map((org, index) => (
                <div key={index} className="pr-6 md:pr-10 shrink-0">
                  <motion.div
                    whileHover={{ 
                      y: -15, 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -10px rgba(198,167,94,0.3)"
                    }}
                    className="bg-card/40 backdrop-blur-xl border border-primary/10 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center group hover:border-primary/40 transition-all duration-300 shadow-glow hover:bg-card/50 relative overflow-hidden flex flex-col justify-center min-w-[240px] md:min-w-[320px]"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                      <span className="text-base md:text-2xl font-heading font-black">ॐ</span>
                    </div>
                    <h4 className="font-heading text-sm md:text-2xl font-bold text-foreground mb-1 md:mb-3 leading-tight md:leading-normal relative z-10 whitespace-normal">
                      {org.name}
                    </h4>
                    <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-primary/60 font-black relative z-10 whitespace-normal">
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
