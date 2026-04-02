import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Info, MapPin, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ParkingSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parkingData, setParkingData] = useState<any[]>([]);

  // Sync with Firestore Data (Cloud)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "parking"), (snapshot) => {
      if (!snapshot.empty) {
        setParkingData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    });

    return () => unsub();
  }, []);

  const getStatus = (id: string | number) => {
    const item = parkingData.find(d => d.id === (typeof id === 'number' ? `lot${id}` : id));
    return item ? item.status : "available";
  };

  const getSpaces = (id: string | number) => {
    const item = parkingData.find(d => d.id === (typeof id === 'number' ? `lot${id}` : id));
    return item ? item.spaces : 0;
  };

  const parkingLocations = [
    {
      id: "lot1",
      title: t('parking.title1'),
      subtitle: t('parking.sub1'),
      description: t('parking.desc1'),
      mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d970.7511182535065!2d74.74472019355284!3d13.287660913923098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDE3JzE2LjMiTiA3NMKwNDQnNDIuOSJF!5e0!3m2!1sen!2sin!4v1774603604677!5m2!1sen!2sin",
      navUrl: "https://www.google.com/maps/dir/?api=1&destination=13.2876609,74.7447202",
      status: getStatus("lot1"),
      spaces: getSpaces("lot1")
    },
    {
      id: "lot2",
      title: t('parking.title2'),
      subtitle: t('parking.sub2'),
      description: t('parking.desc2'),
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.3081649980795!2d74.74613341041184!3d13.284288326445768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb631dafe4a3%3A0xb39c8408ae6b024d!2sSVS%20School%20Ground!5e1!3m2!1sen!2sin!4v1774604632728!5m2!1sen!2sin",
      navUrl: "https://www.google.com/maps/dir/?api=1&destination=SVS+School+Ground+Katapady",
      status: getStatus("lot2"),
      spaces: getSpaces("lot2")
    },
    {
      id: "lot3",
      title: t('parking.title3'),
      subtitle: t('parking.sub3'),
      description: t('parking.desc3'),
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1151.5261270213093!2d74.74284415034195!3d13.282777696129813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcba8d687a5e95%3A0x33fd5d50a541b930!2sSVS%20Pre%20University%20college!5e1!3m2!1sen!2sin!4v1774605178637!5m2!1sen!2sin",
      navUrl: "https://www.google.com/maps/dir/?api=1&destination=SVS+Pre+University+college+Katapady",
      status: getStatus("lot3"),
      spaces: getSpaces("lot3")
    },
    {
      id: "lot4",
      title: t('parking.title4'),
      subtitle: t('parking.sub4'),
      description: t('parking.desc4'),
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1369.4303418908291!2d74.74750465280043!3d13.277942164346097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcba9190ea6d7f%3A0xa6c3794dec4bae45!2sVenkataramana%20Devastana!5e1!3m2!1sen!2sin!4v1774605910444!5m2!1sen!2sin",
      navUrl: "https://www.google.com/maps/dir/?api=1&destination=Sri+Venkataramana+Temple+Katapady",
      status: getStatus("lot4"),
      spaces: getSpaces("lot4")
    },
    {
      id: "lot5",
      title: t('parking.title5'),
      subtitle: t('parking.sub5'),
      description: t('parking.desc5'),
      navUrl: "https://www.google.com/maps/dir/?api=1&destination=Katapady+Shri+Vishwanatha+Kshetra",
      status: getStatus("lot5"),
      spaces: getSpaces("lot5")
    }
  ];

  const nextParking = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % parkingLocations.length);
  };

  const prevParking = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + parkingLocations.length) % parkingLocations.length);
  };

  return (
    <section id="parking" className="py-4 md:py-8 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-primary" />
              <Car className="w-5 h-5 text-primary drop-shadow-glow" />
              <h2 className="font-heading text-xl md:text-3xl font-black text-gradient-gold uppercase tracking-tight">
                {t('parking.header')}
              </h2>
              <Car className="w-5 h-5 text-primary drop-shadow-glow" />
              <div className="h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <p className="font-body text-foreground/60 text-[10px] md:text-sm italic max-w-xl mx-auto">
              {t('parking.tip')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
            {/* Left Side: Map Carousel */}
            <div className="lg:col-span-8 relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative bg-card/30 backdrop-blur-2xl border border-primary/20 rounded-[20px] md:rounded-[32px] p-2 md:p-3 shadow-2xl overflow-hidden aspect-video md:aspect-auto md:h-[400px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full h-full rounded-[16px] md:rounded-[24px] overflow-hidden border border-primary/10 bg-black/40"
                  >
                    <iframe
                      src={parkingLocations[currentIndex].mapUrl}
                      className="w-full h-full grayscale-[0.2] contrast-[1.1]"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows Container - Desktop Only */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex justify-between px-4">
                  <button 
                    type="button"
                    onClick={prevParking}
                    className="p-2 bg-black/60 border border-primary/30 rounded-full text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto opacity-0 group-hover:opacity-100"
                    aria-label="Previous parking spot"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    type="button"
                    onClick={nextParking}
                    className="p-2 bg-black/60 border border-primary/30 rounded-full text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto opacity-0 group-hover:opacity-100"
                    aria-label="Next parking spot"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Mobile Navigation Controls - Outside of Map to prevent iframe issues */}
            <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-card/10 rounded-2xl border border-primary/10">
              <button 
                type="button"
                onClick={prevParking}
                className="p-4 bg-primary text-primary-foreground rounded-full shadow-glow active:scale-90 transition-transform"
                aria-label="Previous parking spot"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col items-center">
                <span className="font-heading text-[10px] text-primary/60 uppercase tracking-widest font-bold">{t('parking.locationNav')}</span>
                <span className="font-heading text-lg text-primary font-black">
                  {currentIndex + 1} / {parkingLocations.length}
                </span>
              </div>

              <button 
                type="button"
                onClick={nextParking}
                className="p-4 bg-primary text-primary-foreground rounded-full shadow-glow active:scale-90 transition-transform"
                aria-label="Next parking spot"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Right Side: Location Details */}
            <div className="lg:col-span-4 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card/20 backdrop-blur-xl border border-primary/20 rounded-[24px] p-5 md:p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h3 className="font-heading text-lg md:text-2xl font-black text-gradient-gold">
                        {parkingLocations[currentIndex].title}
                      </h3>
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                        <div 
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full shadow-glow ${
                            parkingLocations[currentIndex].status === 'available' 
                              ? 'bg-green-500 shadow-green-500/50' 
                              : 'bg-red-500 shadow-red-500/50'
                          }`} 
                        />
                        <span 
                          className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${
                            parkingLocations[currentIndex].status === 'available' 
                              ? 'text-green-500' 
                              : 'text-red-500'
                          }`}
                        >
                          {parkingLocations[currentIndex].status === 'available' 
                            ? `${parkingLocations[currentIndex].spaces} ${t('parking.available')}` 
                            : t('parking.full')}
                        </span>
                      </div>
                    </div>
                    <p className="font-heading text-primary/80 font-bold text-xs md:text-sm uppercase tracking-wider mb-3">
                      {parkingLocations[currentIndex].subtitle}
                    </p>
                    <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                      {parkingLocations[currentIndex].description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={parkingLocations[currentIndex].navUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-heading font-bold rounded-xl shadow-glow hover:bg-primary/90 transition-all text-sm md:text-base"
                    >
                      <Navigation className="w-4 h-4" />
                      {t('parking.navigate')}
                    </motion.a>
                    
                    <div className="flex justify-center gap-2">
                      {parkingLocations.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* General Tip Card */}
              <div className="bg-primary/5 p-4 rounded-[20px] border border-primary/10 flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <p className="font-body text-[11px] md:text-xs text-foreground/60">
                  {t('parking.infoTip')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParkingSection;
