import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, PlusCircle, AlertCircle, Upload, CheckCircle, Image as ImageIcon, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { db, storage } from "../lib/firebase";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface LostAndFoundProps {
  isOpen: boolean;
  onClose: () => void;
}

const LostAndFound = ({ isOpen, onClose }: LostAndFoundProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'found' | 'report' | 'found-submit'>('report');
  const [foundItemsCount, setFoundItemsCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Refs for hidden inputs
  const lostFileRef = useRef<HTMLInputElement>(null);
  const foundFileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    item: "",
    description: ""
  });
  const [lostImage, setLostImage] = useState<File | null>(null);

  const [foundFormData, setFoundFormData] = useState({
    item: "",
    location: "",
    finderName: "",
    finderPhone: ""
  });
  const [foundImage, setFoundImage] = useState<File | null>(null);

  // Calculate found items count from Firestore
  useEffect(() => {
    const q = query(collection(db, "found_items"), where("status", "==", "unclaimed"));
    const unsub = onSnapshot(q, (snapshot) => {
      setFoundItemsCount(snapshot.size);
    });
    return () => unsub();
  }, []);

  // Pro Fix: Convert photo to tiny string for free Firestore storage
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400; // Small size for database efficiency
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = (MAX_WIDTH / width) * height;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5); // 50% quality to keep code short
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.item) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = "";
      if (lostImage) {
        imageUrl = await compressImage(lostImage);
      }

      await addDoc(collection(db, "lost_reports"), {
        ...formData,
        imageUrl,
        id: Date.now(),
        status: "reported",
        date: new Date().toLocaleString(),
      });

      setFormData({ name: "", phone: "", item: "", description: "" });
      setLostImage(null);
      alert(t('lostAndFound.submitSuccess') || "Report submitted successfully.");
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Database error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFoundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundFormData.item || !foundFormData.location) {
      alert("Please fill in essential details.");
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = "";
      if (foundImage) {
        imageUrl = await compressImage(foundImage);
      }

      await addDoc(collection(db, "found_items"), {
        ...foundFormData,
        imageUrl,
        id: Date.now(),
        status: "unclaimed",
        source: "visitor",
        date: new Date().toLocaleDateString(),
      });
      
      setFoundFormData({ item: "", location: "", finderName: "", finderPhone: "" });
      setFoundImage(null);
      alert(t('lostAndFound.foundSubmitSuccessAlert') || "Honesty report logged.");
      onClose();
    } catch (error) {
        console.error("Submission failed:", error);
        alert("Firestore error.");
    } finally {
      setIsUploading(false);
    }
  };

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
            <div className="flex border-b border-primary/10 px-6 pt-4 gap-4 overflow-x-auto custom-scrollbar no-scrollbar scrollbar-hide">
              <button
                onClick={() => setActiveTab('report')}
                className={`pb-3 font-heading text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all relative shrink-0 ${
                  activeTab === 'report' ? 'text-primary' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {t('lostAndFound.tabReport')}
                {activeTab === 'report' && (
                  <motion.div layoutId="lf-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('found-submit')}
                className={`pb-3 font-heading text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all relative shrink-0 ${
                  activeTab === 'found-submit' ? 'text-primary' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {t('lostAndFound.tabFoundSubmit') || "I Found Something"}
                {activeTab === 'found-submit' && (
                  <motion.div layoutId="lf-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('found')}
                className={`pb-3 font-heading text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all relative shrink-0 ${
                  activeTab === 'found' ? 'text-primary' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {t('lostAndFound.tabFoundStatus') || "Security Desk"}
                {activeTab === 'found' && (
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
                    className="space-y-6"
                  >
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-glow">
                        <Search className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-heading text-3xl font-black text-primary mb-1">{foundItemsCount}</h3>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">{t('lostAndFound.custodyText')}</p>
                      </div>
                    </div>

                    <div className="bg-card/40 border border-primary/10 rounded-xl p-5 space-y-4">
                      <div className="flex gap-3 items-start">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/80 leading-relaxed italic">
                           {t('lostAndFound.foundStatement')}
                        </p>
                      </div>
                      <div className="pl-8 text-sm text-foreground/60 space-y-2 font-body">
                        <p dangerouslySetInnerHTML={{ __html: `1. ${t('lostAndFound.instruction1')}` }} />
                        <p dangerouslySetInnerHTML={{ __html: `2. ${t('lostAndFound.instruction2')}` }} />
                        <p dangerouslySetInnerHTML={{ __html: `3. ${t('lostAndFound.instruction3')}` }} />
                      </div>
                    </div>
                  </motion.div>
                ) : activeTab === 'found-submit' ? (
                  <motion.form
                    key="found-submit"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                    onSubmit={handleFoundSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.itemLabelFound') || "Item Name"}</label>
                        <input 
                          type="text" 
                          required
                          value={foundFormData.item}
                          onChange={(e) => setFoundFormData({...foundFormData, item: e.target.value})}
                          placeholder={t('lostAndFound.itemPlaceFound') || "What did you find?"} 
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.locLabelFound') || "Found Location"}</label>
                        <input 
                          type="text" 
                          required
                          value={foundFormData.location}
                          onChange={(e) => setFoundFormData({...foundFormData, location: e.target.value})}
                          placeholder={t('lostAndFound.locPlaceFound') || "Where was it found?"}
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.founderNameLabel') || "Your Name"}</label>
                        <input 
                          type="text" 
                          value={foundFormData.finderName}
                          onChange={(e) => setFoundFormData({...foundFormData, finderName: e.target.value})}
                          placeholder={t('lostAndFound.founderNamePlace') || "Optional"} 
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.founderPhoneLabel') || "Your Phone"}</label>
                        <input 
                          type="tel" 
                          value={foundFormData.finderPhone}
                          onChange={(e) => setFoundFormData({...foundFormData, finderPhone: e.target.value})}
                          placeholder={t('lostAndFound.founderPhonePlace') || "Optional"}
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.imgLabelFound') || "Item Photo"}</label>
                        <input 
                          type="file" 
                          ref={foundFileRef}
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => setFoundImage(e.target.files?.[0] || null)}
                        />
                        <div 
                          onClick={() => foundFileRef.current?.click()}
                          className={`w-full bg-black/40 border border-primary/20 border-dashed rounded-lg px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/5 transition-colors group ${foundImage ? 'border-primary/60 bg-primary/5' : ''}`}
                        >
                           <div className={`p-3 rounded-full transition-colors ${foundImage ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                             {foundImage ? <ImageIcon className="w-5 h-5 text-primary" /> : <Upload className="w-5 h-5 text-primary" />}
                           </div>
                           <p className="text-xs text-foreground/50 font-body text-center">
                             {foundImage ? foundImage.name : (t('lostAndFound.imgPlaceFound') || "Snap a photo of the item")}
                           </p>
                        </div>
                     </div>

                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <CheckCircle size={16} />
                      </div>
                      <p className="text-[11px] text-foreground/60 leading-relaxed font-body italic">
                        <strong>{t('lostAndFound.thanksTitle') || "Thank you for your honesty!"}</strong> {t('lostAndFound.handoverNote') || "Please submit the physical item to the main counter after logging."}
                      </p>
                    </div>

                     <button 
                       type="submit" 
                       disabled={isUploading}
                       className="w-full py-4 bg-primary text-primary-foreground font-heading font-black text-sm uppercase tracking-widest rounded-xl shadow-glow hover:bg-primary/90 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isUploading ? (
                         <RefreshCw className="w-5 h-5 animate-spin" />
                       ) : (
                         <PlusCircle size={18} />
                       )}
                       {isUploading ? "Uploading..." : (t('lostAndFound.submitFound') || "Submit Found Report")}
                     </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="report"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.nameLabel')}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder={t('lostAndFound.namePlace')} 
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                      <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.phoneLabel')}</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder={t('lostAndFound.phonePlace')}
                          className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                      <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.itemLabel')}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.item}
                        onChange={(e) => setFormData({...formData, item: e.target.value})}
                        placeholder={t('lostAndFound.itemPlace')}
                        className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30"
                      />
                    </div>

                    <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                      <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.descLabel')}</label>
                      <textarea 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder={t('lostAndFound.descPlace')}
                        className="w-full bg-black/40 border border-primary/20 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-primary/50 text-foreground transition-colors placeholder:text-foreground/30 resize-none"
                      />
                    </div>
                    
                     <div className="space-y-1.5 border border-primary/20 p-1 rounded-xl bg-card border-none">
                       <label className="text-xs font-bold uppercase tracking-wider text-primary/80 pl-2">{t('lostAndFound.imgLabel')}</label>
                       <input 
                         type="file" 
                         ref={lostFileRef}
                         className="hidden" 
                         accept="image/*"
                         onChange={(e) => setLostImage(e.target.files?.[0] || null)}
                       />
                       <div 
                         onClick={() => lostFileRef.current?.click()}
                         className={`w-full bg-black/40 border border-primary/20 border-dashed rounded-lg px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/5 transition-colors group ${lostImage ? 'border-primary/60 bg-primary/5' : ''}`}
                       >
                          <div className={`p-3 rounded-full transition-colors ${lostImage ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                            {lostImage ? <ImageIcon className="w-5 h-5 text-primary" /> : <Upload className="w-5 h-5 text-primary" />}
                          </div>
                          <p className="text-xs text-foreground/50 font-body text-center">
                            {lostImage ? lostImage.name : (t('lostAndFound.imgPlace') || "Upload an image if available")}
                          </p>
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="w-full py-4 bg-primary text-primary-foreground font-heading font-black text-sm uppercase tracking-widest rounded-xl shadow-glow hover:bg-primary/90 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <PlusCircle size={18} />
                      )}
                      {isUploading ? "Submitting..." : (t('lostAndFound.submit') || "Submit Report")}
                    </button>
                  </motion.form>
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
