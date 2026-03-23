import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import templeBg from "@/assets/temple-bg.jpg";
import templeInterior from "@/assets/temple-interior.jpg";
import tirumalaHills from "@/assets/tirumala-hills.jpg";

const steps = [
  {
    image: tirumalaHills,
    title: "The Sacred Seven Hills",
    description:
      "Begin the divine journey ascending the seven sacred hills of Tirumala — Seshadri, Neeladri, Garudadri, Anjanadri, Vrishabhadri, Narayanadri, and Venkatadri.",
  },
  {
    image: templeBg,
    title: "The Gopuram Gateway",
    description:
      "Pass through the magnificent gopuram towers, intricate stone carvings that have witnessed centuries of unwavering devotion and divine grace.",
  },
  {
    image: templeInterior,
    title: "The Sanctum Sanctorum",
    description:
      "Enter the Garbhagriha — the inner sanctum where Lord Venkateswara stands in all His divine glory, adorned with diamonds and gold.",
  },
];

const TempleExperience = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="temple" className="py-24 md:py-32 bg-sacred-gradient relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-primary text-lg tracking-widest uppercase mb-3">
            ✦ A Sacred Journey ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-gold">
            The Temple Experience
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-12`}
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-xl group">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="text-primary font-heading text-5xl md:text-7xl font-bold opacity-20 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="font-body text-lg text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TempleExperience;
