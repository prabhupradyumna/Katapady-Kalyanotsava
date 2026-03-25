import { motion } from "framer-motion";
import { MapPin, Navigation, MapIcon } from "lucide-react";

const LocationSection = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15538.987791845137!2d74.7431633!3d13.2756181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb7ac1112d6d%3A0xdd756834e429ad22!2sSVS%20Ground!5e0!3m2!1sen!2sin!4v1700000000000";

  return (
    <section id="location" className="py-4 md:py-8 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-temple-gradient opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 md:gap-8 backdrop-blur-xl bg-card/80 border border-primary/20 rounded-[20px] md:rounded-[24px] p-3 md:p-6 shadow-glow overflow-hidden">
          
          <div className="lg:w-5/12 space-y-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="font-body text-primary text-lg uppercase tracking-widest mb-1 font-semibold">
                ✦ Getting Here ✦
              </p>
              <h2 className="font-heading text-xl md:text-3xl lg:text-4xl font-black text-gradient-gold leading-tight mb-3">
                Directions to<br/>the Sacred Ground
              </h2>
              
              <div className="space-y-2 md:space-y-4">
                <div className="bg-temple-dark/40 p-2 md:p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-2 md:gap-3">
                    <MapPin className="w-5 h-5 md:w-8 md:h-8 text-primary mt-0.5" />
                    <div>
                      <p className="font-heading text-sm md:text-lg font-bold text-foreground">Venue Destination</p>
                      <p className="font-body text-[11px] md:text-base text-foreground/60 leading-snug">
                        S.V.S. Ground, Katpadi Pete,<br/>Katapady, Udupi, Karnataka - 574 105
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-temple-dark/40 p-2 md:p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Navigation className="w-5 h-5 md:w-8 md:h-8 text-primary mt-0.5" />
                    <div>
                      <p className="font-heading text-sm md:text-lg font-bold text-foreground">Landmarks</p>
                      <p className="font-body text-[11px] md:text-base text-foreground/60 italic leading-snug">
                        Near Sri Vishwanatha Kshetra, Katapady Main Road.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-2 md:p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="flex flex-col gap-1 md:gap-2">
                    <p className="font-heading text-[10px] md:text-sm font-bold text-primary uppercase tracking-widest">Need help with directions?</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-foreground/80 font-body font-bold text-[11px] md:text-base">
                      <a href="tel:9845242167" className="hover:text-primary transition-colors">9845242167</a>
                      <a href="tel:9964578732" className="hover:text-primary transition-colors">9964578732</a>
                      <a href="tel:9892012060" className="hover:text-primary transition-colors">9892012060</a>
                    </div>
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://maps.app.goo.gl/v99qmt3BUPPKjTGSA?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="mt-2 md:mt-4 inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground font-heading font-bold text-sm md:text-base rounded-xl shadow-glow group"
              >
                <MapIcon className="w-3 h-3 md:w-5 md:h-5" />
                Open in Google Maps
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:w-7/12 w-full h-[180px] md:h-[300px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-divine relative bg-gray-900 self-center">
            <iframe
              src={mapUrl}
              className="w-full h-full grayscale-[0.2] contrast-[1.1]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
