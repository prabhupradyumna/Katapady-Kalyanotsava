import { motion } from "framer-motion";
import { Coins, HeartHandshake, Users, AlertTriangle, Info, Phone } from "lucide-react";

const SevasGuidelines = () => {
  const sevas = [
    {
      title: "Tirupathi Hundi",
      icon: <Coins className="w-12 h-12 text-[#FF9933]" />,
      description: "Devotees who wish to offer donations can contribute through the Tirupathi Hundi. All collected offerings will be directly sent to Tirumala Tirupati Devasthanams (TTD) without any diversion.",
      contact: null
    },
    {
      title: "Darshan Assistance",
      icon: <HeartHandshake className="w-12 h-12 text-[#FF9933]" />,
      description: "Special assistance is provided for physically challenged devotees and those in need of support. For arrangements and guidance, please contact our helpline.",
      contact: "9845242167"
    },
    {
      title: "Volunteer Opportunities",
      icon: <Users className="w-12 h-12 text-[#FF9933]" />,
      description: "Volunteers are warmly welcomed to support the event and its arrangements. Join us in this divine service for the community.",
      contact: "9964578732 / 9892012060"
    }
  ];

  const guidelines = [
    "Flowers intended for offering to the deity must be submitted before 3:00 PM.",
    "No collections or donations should be made in the name of Tirupathi by any individual without authorization.",
    "Devotees are requested to follow all instructions respectfully to maintain the sanctity of the event."
  ];

  return (
    <section id="sevas" className="py-8 md:py-10 bg-temple-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-body text-[#FF9933] text-lg tracking-[0.4em] uppercase font-bold mb-4"
          >
            ✦ Devotional Services ✦
          </motion.p>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-gradient-gold uppercase">
            Sevas & Guidelines
          </h2>
        </div>

        {/* Section 1: Sevas Offered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {sevas.map((seva, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-[40px] p-8 md:p-10 shadow-glow flex flex-col items-center text-center relative overflow-hidden group"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')" }}
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 group-hover:bg-primary/40 transition-colors" />
                <div className="relative z-10">{seva.icon}</div>
              </div>
              
              <h3 className="font-heading text-2xl font-black text-foreground mb-4 uppercase tracking-tight">
                {seva.title}
              </h3>
              
              <p className="font-body text-foreground/70 leading-relaxed mb-8 italic">
                {seva.description}
              </p>

               {seva.contact && (
                <a 
                  href={`tel:${seva.contact.split(' / ')[0].replace(/\s/g, '')}`}
                  className="mt-auto flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 cursor-pointer shadow-sm hover:shadow-glow-primary"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-heading font-black tracking-widest uppercase text-sm">
                    {seva.contact}
                  </span>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Section 2: Important Guidelines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 via-transparent to-[#FF9933]/10 opacity-30 blur-3xl pointer-events-none" />
          
          <div className="relative bg-temple-black/60 border-2 border-[#FF9933]/30 rounded-[30px] p-8 md:p-12 overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/20 flex items-center justify-center border border-[#FF9933]/40 shadow-inner">
                <AlertTriangle className="w-7 h-7 text-[#FF9933]" />
              </div>
              <h4 className="font-heading text-2xl md:text-3xl font-black text-[#FF9933] uppercase spacing-tracking-widest">
                Important Guidelines
              </h4>
            </div>

            <div className="space-y-6">
              {guidelines.map((text, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FF9933] mt-2.5 flex-shrink-0 shadow-[0_0_10px_#FF9933]" />
                  <p className="font-body text-foreground/90 text-lg md:text-xl leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Info className="w-24 h-24 text-[#FF9933]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SevasGuidelines;
