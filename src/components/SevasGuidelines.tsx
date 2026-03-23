import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, HeartHandshake, Users, AlertTriangle, Info, Phone, ClipboardList } from "lucide-react";

const SevasGuidelines = () => {
  const [activeTab, setActiveTab] = useState<"sevas" | "guidelines">("sevas");

  const sevas = [
    {
      title: "Tirupathi Hundi",
      icon: <Coins className="w-8 h-8 md:w-12 md:h-12 text-[#FF9933]" />,
      description: "Contribute through the Tirupathi Hundi. Offerings directed to TTD without diversion.",
      contact: null
    },
    {
      title: "Darshan Assistance",
      icon: <HeartHandshake className="w-8 h-8 md:w-12 md:h-12 text-[#FF9933]" />,
      description: "Special assistance for physically challenged devotees. Contact our helpline.",
      contact: "9845242167"
    },
    {
      title: "Volunteer Roles",
      icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-[#FF9933]" />,
      description: "Join us in this divine service. Volunteers warmly welcomed for event support.",
      contact: "9964578732 / 9892012060"
    }
  ];

  const guidelines = [
    "Flowers for deity must be submitted before 3:00 PM.",
    "No unauthorized donations should be made in Tirupathi name.",
    "Follow all instructions to maintain sanctity of the event."
  ];

  return (
    <section id="sevas" className="py-6 md:py-10 bg-temple-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-body text-[#FF9933] text-sm md:text-lg tracking-[0.4em] uppercase font-bold mb-2 md:mb-4"
          >
            ✦ Devotional Services ✦
          </motion.p>
          <h2 className="font-heading text-3xl md:text-6xl font-black text-gradient-gold uppercase">
            Sevas & Guidelines
          </h2>
        </div>

        {/* Mobile Tabs Toggle */}
        <div className="flex md:hidden items-center justify-center mb-8 p-1 bg-black/40 rounded-2xl border border-primary/20 backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab("sevas")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${activeTab === "sevas" ? "bg-primary text-primary-foreground shadow-glow-primary" : "text-foreground/60"}`}
          >
            <Coins className="w-4 h-4" />
            <span className="font-heading font-bold text-sm uppercase tracking-widest">Sevas</span>
          </button>
          <button 
            onClick={() => setActiveTab("guidelines")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${activeTab === "guidelines" ? "bg-primary text-primary-foreground shadow-glow-primary" : "text-foreground/60"}`}
          >
            <ClipboardList className="w-4 h-4" />
            <span className="font-heading font-bold text-sm uppercase tracking-widest">Rules</span>
          </button>
        </div>

        <div className="relative">
          {/* Sevas Offered - Bulletproof Seamless Marquee */}
          <div
            className={`relative overflow-hidden w-full flex mb-8 md:mb-16 ${activeTab !== "sevas" ? "hidden md:flex" : "flex"}`}
          >
            <motion.div
              animate={{ x: ["0%", "-25%"] }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              className="flex shrink-0 py-4"
            >
              {[...sevas, ...sevas, ...sevas, ...sevas].map((seva, index) => (
                <div key={index} className="pr-6 md:pr-14 shrink-0">
                  <motion.div
                    whileHover={{ 
                      y: -15, 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -10px rgba(198,167,94,0.3)"
                    }}
                    className="w-[240px] md:w-[320px] bg-card/40 backdrop-blur-xl border border-primary/20 rounded-[32px] md:rounded-[40px] p-6 md:p-8 text-center group hover:border-primary/40 transition-all duration-300 shadow-glow relative overflow-hidden flex flex-col items-center min-h-[300px] md:min-h-[400px]"
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/parchment.png')" }}
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                        <span className="text-base md:text-2xl font-heading font-black">ॐ</span>
                      </div>
                      
                      <h3 className="font-heading text-sm md:text-2xl font-bold text-foreground mb-1 md:mb-3 leading-tight md:leading-normal relative z-10 whitespace-normal text-center line-clamp-2 uppercase">
                        {seva.title}
                      </h3>
                      
                      <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-primary/60 font-black relative z-10 whitespace-normal text-center line-clamp-4">
                        {seva.description}
                      </p>
                    </div>

                    {seva.contact && (
                      <div className="relative z-10 w-full pt-4 mt-auto">
                        <a 
                          href={`tel:${seva.contact.split(' / ')[0].replace(/\s/g, '')}`}
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="font-heading font-black tracking-widest uppercase text-[10px] md:text-sm">
                            {seva.contact}
                          </span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Important Guidelines - Block on desktop, Tabbed on mobile */}
          <div
            className={`max-w-4xl mx-auto relative group ${activeTab !== "guidelines" ? "hidden md:block" : "block"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 via-transparent to-[#FF9933]/10 opacity-30 blur-3xl pointer-events-none" />
            
            <div className="relative bg-temple-black/60 border-2 border-[#FF9933]/30 rounded-2xl md:rounded-[30px] p-6 md:p-12 overflow-hidden">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#FF9933]/20 flex items-center justify-center border border-[#FF9933]/40 shadow-inner">
                  <AlertTriangle className="w-5 h-5 md:w-7 md:h-7 text-[#FF9933]" />
                </div>
                <h4 className="font-heading text-xl md:text-3xl font-black text-[#FF9933] uppercase tracking-wider">
                  Important Rules
                </h4>
              </div>

              <div className="space-y-4 md:space-y-6">
                {guidelines.map((text, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF9933] mt-2 flex-shrink-0 shadow-[0_0_10px_#FF9933]" />
                    <p className="font-body text-foreground/90 text-sm md:text-xl leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Info className="w-16 h-16 md:w-24 md:h-24 text-[#FF9933]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SevasGuidelines;
