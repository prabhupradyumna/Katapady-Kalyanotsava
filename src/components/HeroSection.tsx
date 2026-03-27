import { motion } from "framer-motion";
import heroDeity from "@/assets/hero-deity.png";
import mandalaPattern from "@/assets/mandala-pattern.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background mandala */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src={mandalaPattern}
          alt=""
          className="w-[120%] max-w-none animate-rotate-slow"
          aria-hidden="true"
        />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 divine-aura" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Aura behind deity */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsla(43, 80%, 48%, 0.25) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
          }}
        />

        <motion.div
          className="mb-8 md:mb-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="bg-card/40 backdrop-blur-md border border-primary/30 p-4 md:p-8 rounded-2xl shadow-divine max-w-4xl mx-auto relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] mb-2 text-primary font-bold animate-pulse-glow">
              ✦ Patron of Divine Service ✦
            </p>
            <h2 className="font-heading text-xl md:text-4xl lg:text-5xl font-black text-gradient-gold mb-2 leading-tight drop-shadow-glow">
              Mrs. Vijaya Pai & Mr. Purushotham Pai and Family
            </h2>
            <p className="font-heading italic text-lg md:text-2xl text-white/90 mb-4 tracking-wide">
              with a Pious Resolve
            </p>
            <div className="h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4 opacity-50" />
            <p className="font-body text-xs md:text-lg text-foreground/80 font-medium tracking-widest uppercase">
              Tirumala Tirupati Devasthanams, Tirupati <br className="md:hidden" />
              <span className="text-primary mt-1 inline-block">“Loka Kalyanartha”</span>
            </p>
          </div>
        </motion.div>

        {/* Deity image */}
        <motion.img
          src={heroDeity}
          alt="Lord Sri Venkateswara"
          className="w-40 h-auto md:w-64 lg:w-72 object-contain drop-shadow-2xl animate-float relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-gold leading-tight">
            Experience the<br />Divine Presence
          </h1>
          <p className="font-body text-xl md:text-2xl text-foreground/70 mt-4 max-w-2xl mx-auto">
            Surrender to the eternal grace of Lord Sri Venkateswara, the Lord of Seven Hills
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#about"
            className="px-8 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg glow-gold hover:scale-105 transition-transform duration-300"
          >
            Begin Journey
          </a>
          <a
            href="#temple"
            className="px-8 py-3 border border-primary/50 text-primary font-heading font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            Explore Temple
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
