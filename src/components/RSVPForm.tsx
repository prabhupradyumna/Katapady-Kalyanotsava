import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Heart } from "lucide-react";

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store in localStorage
      const rsvpList = JSON.parse(localStorage.getItem("kalyanotsava_rsvp") || "[]");
      rsvpList.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem("kalyanotsava_rsvp", JSON.stringify(rsvpList));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="rsvp" className="py-16 bg-temple-gradient relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 backdrop-blur-[80px] bg-card/40 border border-primary/20 rounded-[40px] p-8 md:p-12 shadow-intense">
          
          <div className="md:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="font-body text-primary text-xl uppercase tracking-widest mb-2 font-semibold">
                ✦ Sacred Invitation ✦
              </p>
              <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-gradient-gold leading-tight">
                Witness the<br/>Divine Union
              </h2>
              <p className="font-body text-xl text-foreground/70 mt-4 leading-relaxed italic">
                Your presence adds grace to this celestial wedding of the Supreme Lord and the Divine Mother.
              </p>
              
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-body text-lg">Celebrate eternal love and dharma</p>
                </div>
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-body text-lg">Receive divine mahaprasada</p>
                </div>

                <div className="pt-6 border-t border-primary/10 mt-6">
                  <p className="font-heading text-primary text-sm uppercase tracking-widest mb-3">Questions? Contact Us</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-foreground font-body font-bold">
                    <a href="tel:9845242167" className="hover:text-primary transition-colors">9845242167</a>
                    <a href="tel:9964578732" className="hover:text-primary transition-colors">9964578732</a>
                    <a href="tel:9892012060" className="hover:text-primary transition-colors">9892012060</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 w-full">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-temple-dark/50 p-8 rounded-3xl border border-primary/20 shadow-divine"
                >
                  <div className="space-y-2">
                    <label className="font-heading text-primary text-sm uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rama Rao"
                      className="w-full bg-temple-black border border-primary/30 focus:border-primary px-6 py-4 rounded-xl text-foreground placeholder:text-foreground/20 outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-heading text-primary text-sm uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-temple-black border border-primary/30 focus:border-primary px-6 py-4 rounded-xl text-foreground placeholder:text-foreground/20 outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-heading text-primary text-sm uppercase tracking-widest ml-1">No. of Guests</label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-temple-black border border-primary/30 focus:border-primary px-6 py-4 rounded-xl text-foreground outline-none transition-all duration-300 appearance-none"
                      >
                        {[1, 2, 3, 4, 5, "5+"].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-sacred-gold-dark to-primary text-primary-foreground font-heading font-bold text-xl rounded-xl shadow-[0_0_20px_rgba(255,183,0,0.3)] flex items-center justify-center gap-3 group overflow-hidden relative"
                  >
                    <span className="relative z-10">{isSubmitting ? "Receiving Grace..." : "RSVP – Confirm Attendance"}</span>
                    {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    <div className="absolute inset-0 bg-white/20 translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/20 backdrop-blur-xl border-2 border-primary/40 rounded-[30px] p-12 text-center space-y-6 shadow-glow"
                >
                  <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(255,183,0,0.6)]">
                    <CheckCircle className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-4xl font-bold text-primary">Grace Received</h3>
                  <p className="font-body text-xl text-foreground leading-relaxed">
                    Success! We've registered your arrival. May the blessings of Lord Srinivasa be with you {formData.name}.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="font-heading text-primary/70 hover:text-primary transition-colors uppercase tracking-widest text-sm"
                  >
                    Register Another Person
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
