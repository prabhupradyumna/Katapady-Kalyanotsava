import { motion } from "framer-motion";

const WarmlyWelcomed = () => {
  return (
    <section className="py-8 md:py-12 bg-temple-deep overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "SVS Vidyavardhaka Sangha", role: "Educational Trust" },
              { name: "Katapadi Pai Family", role: "Devotional Patronage" },
              { name: "GSB Community Udupi", role: "Community Coordination" },
              { name: "Adyar Bhajan Mandir", role: "Spiritual Presence" }
            ].map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-3xl p-8 text-center group hover:border-primary/40 transition-all duration-500 shadow-glow hover:bg-card/50"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')" }}
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <span className="text-xl font-heading font-black">ॐ</span>
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground mb-2 leading-tight">
                  {org.name}
                </h4>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary/60 font-black">
                  {org.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarmlyWelcomed;
