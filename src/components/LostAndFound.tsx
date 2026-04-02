import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, PlusCircle, AlertCircle, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { api, LostFoundItem } from "../lib/api";
import { useEffect } from "react";

interface LostAndFoundProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data removed in favor of api.getLostFound()

const LostAndFound = ({ isOpen, onClose }: LostAndFoundProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'found' | 'report'>('found');
  const [foundItems, setFoundItems] = useState<LostFoundItem[]>([]);

  useEffect(() => {
    const loadItems = () => {
      setFoundItems(api.getLostFound());
    };
    loadItems();
    window.addEventListener("lostFoundUpdated", loadItems);
    return () => window.removeEventListener("lostFoundUpdated", loadItems);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-temple-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div>
                <h2 className="font-heading text-2xl font-black text-gradient-gold">{t('lostAndFound.header')}</h2>
                <p className="text-sm text-foreground/60 font-body">{t('lostAndFound.subtext')}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-primary/10 px-6 pt-4 gap-6">
              <button
                onClick={() => setActiveTab('found')}
                className={`pb-3 font-heading text-sm uppercase tracking-wider font-bold transition-all relative ${
                  activeTab === 'found' ? 'text-primary' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {t('lostAndFound.tabFound')}
                {activeTab === 'found' && (
                  <motion.div layoutId="lf-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`pb-3 font-heading text-sm uppercase tracking-wider font-bold transition-all relative ${
                  activeTab === 'report' ? 'text-primary' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {t('lostAndFound.tabReport')}
                {activeTab === 'report' && (
                  <motion.div layoutId="lf-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow" />
                )}
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
              <AnimatePresence mode="wait">
                {activeTab === 'found' ? (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6 max-h-[50vh] overflow-y-auto"
                  >
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 text-sm text-foreground/80 leading-relaxed items-start">
                      <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-primary block mb-1">{t('lostAndFound.claimInst')}</strong>
                        <span dangerouslySetInnerHTML={{ __html: t('lostAndFound.claimText') }} />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {foundItems.length > 0 ? (
                        foundItems.map(item => (
                          <div key={item.id} className="bg-card/40 border border-primary/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between md:items-center group hover:border-primary/30 transition-colors">
                            <div>
                              <h4 className="font-heading font-bold text-lg text-foreground mb-1">{item.name}</h4>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-foreground/60 font-body">
                                <span className="flex items-center gap-1"><Search size={12} className="text-primary/70" /> {t('lostAndFound.foundAt')} {item.location}</span>
                                <span className="flex items-center gap-1 text-primary/60">⏱ {item.date}</span>
                              </div>
                            </div>
                            <span className="shrink-0 text-center bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest px-3 py-2 md:py-1 rounded-lg font-bold">{t('lostAndFound.claimCounter')}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 px-4 bg-primary/5 border border-primary/10 rounded-xl flex flex-col items-center justify-center gap-3">
                          <Search className="w-8 h-8 text-primary/40 mb-2" />
                          <p className="text-primary/70 font-body text-sm font-medium">{t('lostAndFound.empty')}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.nameLabel')}</label>
                        <input 
                          type="text" 
                          placeholder={t('lostAndFound.namePlace')} 
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.phoneLabel')}</label>
                        <input 
                          type="tel" 
                          placeholder={t('lostAndFound.phonePlace')}
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                      <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.itemLabel')}</label>
                      <input 
                        type="text" 
                        placeholder={t('lostAndFound.itemPlace')}
                        className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                      />
                    </div>

                    <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                      <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.descLabel')}</label>
                      <textarea 
                        rows={3}
                        placeholder={t('lostAndFound.descPlace')}
                        className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30 resize-none"
                      />
                    </div>
                    
                    <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                       <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.imgLabel')}</label>
                       <div className="w-full bg-black/40 border border-primary/20 border-dashed rounded-lg px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/5 transition-colors group">
                          <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                            <Upload className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-xs text-foreground/50 font-body">{t('lostAndFound.imgPlace')}</p>
                       </div>
                    </div>

                    <button className="w-full py-4 bg-primary text-primary-foreground font-heading font-black text-sm uppercase tracking-widest rounded-xl shadow-glow hover:bg-primary/90 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                      <PlusCircle size={18} />
                      {t('lostAndFound.submit')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LostAndFound;
