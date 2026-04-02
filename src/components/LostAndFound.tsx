import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, PlusCircle, AlertCircle, Upload, CheckCircle, Image as ImageIcon, RefreshCw, MapPin, ClipboardList } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'tabFound' | 'tabReport' | 'tabFoundSubmit'>('tabReport');
  const [foundCount, setFoundCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Get only the count for privacy
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "found_items"), (snapshot) => {
      setFoundCount(snapshot.docs.length);
    });
    return () => unsub();
  }, []);

  const handleReportSubmit = async (e: React.FormEvent, collectionName: string) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let downloadURL = "";
      if (selectedFile) {
        const storageRef = ref(storage, `${collectionName}/${Date.now()}-${selectedFile.name}`);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        downloadURL = await getDownloadURL(snapshot.ref);
      }
      
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      await addDoc(collection(db, collectionName), {
        item: formData.get('item'),
        description: formData.get('description'),
        location: formData.get('location'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        imageUrl: downloadURL,
        date: new Date().toLocaleDateString(),
        status: collectionName === "found_items" ? 'found' : 'pending'
      });
      
      setUploadSuccess(true);
      setTimeout(() => { 
        setUploadSuccess(false); 
        onClose(); 
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-temple-black/80 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-card border border-primary/20 rounded-[32px] overflow-hidden shadow-divine z-10 flex flex-col max-h-[90vh]">
            <div className="p-5 md:p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
              <div className="space-y-0.5">
                <h2 className="font-heading text-2xl md:text-3xl font-black text-gradient-gold uppercase tracking-tight">
                   {t('nav.lostFound')}
                </h2>
                <p className="text-primary/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] italic">
                   {t('lostAndFound.subtext')}
                </p>
              </div>
              <button onClick={onClose} className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-all active:scale-90"><X size={20} /></button>
            </div>

            <div className="p-3 border-b border-primary/10 flex gap-2 justify-center md:justify-start bg-black/20 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('tabReport')} className={`px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'tabReport' ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-primary/5 text-primary'}`}>
                  {t('lostAndFound.tabReport')}
                </button>
                <button onClick={() => setActiveTab('tabFoundSubmit')} className={`px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'tabFoundSubmit' ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-primary/5 text-primary'}`}>
                   {t('lostAndFound.tabFoundSubmit')}
                </button>
                <button onClick={() => setActiveTab('tabFound')} className={`px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'tabFound' ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-primary/5 text-primary'}`}>
                  {t('lostAndFound.tabFound')}
                  <span className="px-1.5 py-0.5 bg-primary/20 rounded text-[9px]">{foundCount}</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
              {activeTab === 'tabReport' ? (
                <motion.form onSubmit={(e) => handleReportSubmit(e, 'lost_reports')} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
                  <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.itemLabel')}</label>
                          <input name="item" required type="text" placeholder={t('lostAndFound.itemPlace')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none font-bold" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.descLabel')}</label>
                          <input name="location" required type="text" placeholder={t('lostAndFound.descPlace')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">Details / Markings</label>
                      <textarea name="description" rows={1} placeholder="Describe the item briefly..." className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2 text-xs focus:border-primary/50 outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.nameLabel')}</label>
                        <input name="name" required type="text" placeholder={t('lostAndFound.namePlace')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.phoneLabel')}</label>
                        <input name="phone" required type="tel" placeholder={t('lostAndFound.phonePlace')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.imgLabel')}</label>
                      <div className="relative h-20 bg-black/40 border border-primary/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-all border-dashed border">
                        <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        {selectedFile ? (
                           <span className="text-[9px] text-primary truncate px-4">{selectedFile.name}</span>
                        ) : (
                          <div className="flex items-center gap-2 opacity-40">
                             <Upload size={14} />
                             <span className="text-[9px] font-bold uppercase">{t('lostAndFound.imgPlace')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="submit" disabled={isUploading} className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-widest shadow-glow active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-2">
                      {isUploading ? <RefreshCw className="animate-spin" size={14} /> : uploadSuccess ? <CheckCircle size={14} /> : <PlusCircle size={14} />} 
                      {uploadSuccess ? "Report Lodged" : isUploading ? "Saving..." : t('lostAndFound.submit')}
                    </button>
                  </div>
                </motion.form>
              ) : activeTab === 'tabFoundSubmit' ? (
                <motion.form onSubmit={(e) => handleReportSubmit(e, 'found_items')} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
                  <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.itemLabelFound')}</label>
                          <input name="item" required type="text" placeholder={t('lostAndFound.itemPlaceFound')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none font-bold" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.locLabelFound')}</label>
                          <input name="location" required type="text" placeholder={t('lostAndFound.locPlaceFound')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.founderNameLabel')}</label>
                        <input name="name" type="text" placeholder={t('lostAndFound.founderNamePlace')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.founderPhoneLabel')}</label>
                        <input name="phone" type="tel" placeholder={t('lostAndFound.founderPhonePlace')} className="w-full bg-black/40 border border-primary/10 rounded-lg px-4 py-2.5 text-xs focus:border-primary/50 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60 ml-1">{t('lostAndFound.imgLabelFound')}</label>
                      <div className="relative h-20 bg-black/40 border border-primary/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-all border-dashed border">
                        <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        {selectedFile ? (
                           <span className="text-[9px] text-primary truncate px-4">{selectedFile.name}</span>
                         ) : (
                          <div className="flex items-center gap-2 opacity-40">
                             <Upload size={14} />
                             <span className="text-[9px] font-bold uppercase block">{t('lostAndFound.imgPlace')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="submit" disabled={isUploading} className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-widest shadow-glow active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-2">
                      {isUploading ? <RefreshCw className="animate-spin" size={14} /> : uploadSuccess ? <CheckCircle size={14} /> : <PlusCircle size={14} />} 
                      {uploadSuccess ? "Logged" : isUploading ? "Saving..." : t('lostAndFound.submitFound')}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="bg-primary/5 border border-primary/10 rounded-2x p-6 text-center space-y-4 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 relative">
                        <ClipboardList size={28} />
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded shadow-glow">
                           {foundCount}
                        </span>
                    </div>
                    <div className="max-w-xl">
                      <h3 className="font-heading text-lg font-black text-primary uppercase mb-2">{t('lostAndFound.instructionHeader')}</h3>
                      <div className="py-3 px-5 bg-black/40 rounded-xl border border-primary/10 text-primary italic text-[11px] mb-4 leading-relaxed font-body">
                         {t('lostAndFound.foundStatement')}
                      </div>
                      <div className="space-y-2 text-xs text-foreground/70 leading-normal font-body text-left border-l-2 border-primary/30 pl-6">
                        <p dangerouslySetInnerHTML={{ __html: `1. ${t('lostAndFound.instruction1')}` }} />
                        <p dangerouslySetInnerHTML={{ __html: `2. ${t('lostAndFound.instruction2')}` }} />
                        <p dangerouslySetInnerHTML={{ __html: `3. ${t('lostAndFound.instruction3')}` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LostAndFound;
