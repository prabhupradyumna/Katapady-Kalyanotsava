import { motion } from "framer-motion";
import { Sparkles, Heart, CheckCircle } from "lucide-react";

const eventItems = [
  {
    time: "5:00 PM",
    title: "Swarnamani Bandhana",
    description: "Invoking peace and prosperity with sacred vedic chants.",
    icon: Sparkles
  },
  {
    time: "5:50 PM",
    title: "Srinivasa Kalyanotsava",
    description: "The grand celestial wedding of the Divine Couple.",
    icon: Heart
  },
  {
    time: "8:30 PM",
    title: "Mahaprasada",
    description: "Sacred distribution of blissful prasada to all devotees.",
    icon: CheckCircle
  }
];

const EventTimeline = () => {
  return (
    <section id="schedule" className="py-10 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-12">
          <p className="font-body text-primary text-lg uppercase tracking-[0.3em] mb-2 font-semibold">
            ✦ Sacred Journey ✦
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-gradient-gold">
            Event Schedule
          </h2>
        </div>

        <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-3 md:gap-8 pb-6 md:pb-0 px-4 md:px-0 scrollbar-hide">
          {eventItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[170px] md:min-w-0 snap-center bg-card/20 backdrop-blur-xl border border-primary/20 p-4 md:p-10 rounded-2xl md:rounded-[40px] hover:border-primary/40 transition-all group overflow-hidden relative flex-shrink-0"
            >
              <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 bg-primary/5 rounded-full -mr-8 -mt-8 md:-mr-12 md:-mt-12 blur-xl md:blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-8">
                <div className="p-2 md:p-6 bg-primary/10 rounded-lg md:rounded-3xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <item.icon className="w-5 h-5 md:w-10 md:h-10" />
                </div>
                <div>
                  <h4 className="font-heading text-xs md:text-2xl font-black text-primary mb-0.5 md:mb-2 uppercase tracking-tighter md:tracking-widest">
                    {item.time}
                  </h4>
                  <h3 className="font-heading text-sm md:text-3xl font-bold text-foreground mb-2 md:mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-[10px] md:text-lg text-foreground/60 leading-tight md:leading-relaxed italic line-clamp-2 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;
