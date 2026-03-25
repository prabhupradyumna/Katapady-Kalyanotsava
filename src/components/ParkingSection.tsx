import { motion } from "framer-motion";
import { Car, Info, MapPin } from "lucide-react";
import parkingMap from "@/assets/parking-map-final.jpg";

const ParkingSection = () => {
  return (
    <section id="parking" className="py-4 md:py-8 bg-temple-black relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-depth-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4 md:mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-primary" />
              <Car className="w-5 h-5 text-primary drop-shadow-glow" />
              <h2 className="font-heading text-xl md:text-3xl font-black text-gradient-gold uppercase tracking-tight">
                Parking Arrangements
              </h2>
              <Car className="w-5 h-5 text-primary drop-shadow-glow" />
              <div className="h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <p className="font-body text-foreground/60 text-[10px] md:text-sm italic max-w-xl mx-auto">
              Scan the QR code or refer to the map below for designated parking areas.
            </p>
          </motion.div>

          {/* Premium Square Card - More compact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group w-full bg-card/30 backdrop-blur-2xl border border-primary/20 rounded-[20px] md:rounded-[32px] p-2 md:p-4 shadow-xl overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="relative aspect-square w-full max-w-[450px] mx-auto rounded-[16px] md:rounded-[24px] overflow-hidden border border-primary/10 shadow-inner bg-black/40">
              <img 
                src={parkingMap} 
                alt="Parking Map with QR Code" 
                className="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            
            <div className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-1 md:px-0">
              <motion.div 
                whileHover={{ y: -3 }}
                className="flex items-start gap-2 bg-primary/5 p-3 md:p-4 rounded-xl border border-primary/10 hover:border-primary/20 transition-all"
              >
                <div className="bg-primary/20 p-1.5 rounded-lg">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-primary font-bold text-[10px] md:text-xs uppercase">Venue Parking</p>
                  <p className="font-body text-[9px] md:text-[11px] text-foreground/70 leading-tight">
                    Ample parking space at S.V.S. School Ground and nearby designated zones. 
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="flex items-start gap-2 bg-primary/5 p-3 md:p-4 rounded-xl border border-primary/10 hover:border-primary/20 transition-all"
              >
                <div className="bg-primary/20 p-1.5 rounded-lg">
                  <Car className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-primary font-bold text-[10px] md:text-xs uppercase">Traffic Flow</p>
                  <p className="font-body text-[9px] md:text-[11px] text-foreground/70 leading-tight">
                    Please follow markers and volunteer instructions for smooth entry.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParkingSection;
