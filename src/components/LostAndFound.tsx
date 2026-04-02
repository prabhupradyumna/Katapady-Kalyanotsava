import { useState, useEffect } from "react";
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
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sync found items from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "found_items"), (snapshot) => {
      setFoundItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `found-items/${Date.now()}-${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      await addDoc(collection(db, "lost_reports"), {
        item: formData.get('item'),
        description: formData.get('description'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        imageUrl: downloadURL,
        date: new Date().toLocaleDateString(),
        status: 'pending'
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

  const filteredItems = foundItems.filter(item => 
    item.item?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-temple-black/80 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-4xl bg-card border border-primary/20 rounded-[40px] overflow-hidden shadow-divine z-10 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-primary/10 flex justify-between items-center bg-primary/5">
              <div>
                <h2 className="font-heading text-3xl font-black text-gradient-gold uppercase tracking-tight">{t('nav.lostFound')}</h2>
                <p className="text-foreground/40 text-xs font-black uppercase tracking-[0.2em] mt-1 italic">{t('lostAndFound.subtitle')}</p>
              </div>
              <button onClick={onClose} className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-all"><X size={24} /></button>
            </div>

            <div className="p-4 border-b border-primary/10 flex gap-2 md:gap-4 justify-center md:justify-start">
              {['report', 'found', 'found-submit'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab as any)} 
                  className={`px-4 py-2 rounded-xl text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
                >
                  {t(`lostAndFound.${tab}`)}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
              {activeTab === 'report' ? (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                    <input type="text" placeholder={t('lostAndFound.searchPlaceholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/40 border border-primary/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:border-primary/50 outline-none transition-all" />
                  </div>
                  <div className="grid gap-3 md:gap-4">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <div key={item.id} className="bg-card/40 border border-primary/10 rounded-2xl p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all">
                          <div>
                            <h4 className="font-heading font-black text-lg text-primary uppercase">{item.item}</h4>
                            <p className="text-[10px] text-foreground/40 uppercase tracking-widest">{t('lostAndFound.foundAt')} {item.location} • {item.date}</p>
                          </div>
                          <span className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg text-center">{t('lostAndFound.claimCounter')}</span>
                        </div>
                      ))
                    ) : <div className="text-center py-20 text-foreground/20 italic">{t('lostAndFound.empty')}</div>}
                  </div>
                </motion.div>
              ) : activeTab === 'found-submit' ? (
                <motion.form onSubmit={handleFileUpload} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto space-y-4">
                  <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">What did you lose?</label>
                      <input name="item" required type="text" placeholder="e.g. Black iPhone, Gold Ring" className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Detail description</label>
                      <textarea name="description" rows={3} placeholder="Describe any unique markings, color, or condition..." className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Full Name</label>
                        <input name="name" required type="text" className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Contact Number</label>
                        <input name="phone" required type="tel" className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Proof Photo (Optional)</label>
                      <div className="relative h-40 bg-black/40 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center transition-all hover:bg-black/60 hover:border-primary/40">
                        <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        {selectedFile ? <div className="text-center font-bold text-primary"><ImageIcon className="mx-auto mb-2" />{selectedFile.name}</div> : <div className="text-center text-foreground/40 font-bold uppercase tracking-widest"><Upload className="mx-auto mb-2 text-primary/40" /> {t('lostAndFound.uploadBtn')}</div>}
                      </div>
                    </div>
                    <button type="submit" disabled={isUploading} className={`w-full py-5 rounded-2xl font-heading font-black text-sm uppercase tracking-widest shadow-glow flex items-center justify-center gap-3 transition-all ${uploadSuccess ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'}`}>
                      {isUploading ? <RefreshCw className="animate-spin" /> : uploadSuccess ? <CheckCircle /> : <PlusCircle size={20} />} {uploadSuccess ? "Report Filed Successfully!" : isUploading ? "Broadcasting to Cloud..." : "File Official Report"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="bg-primary/5 border border-primary/10 rounded-[32px] p-6 md:p-10 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-4 shrink-0"><AlertCircle size={32} /></div>
                    <div className="max-w-xl mx-auto">
                      <h3 className="font-heading text-2xl font-black text-primary uppercase mb-3">{t('lostAndFound.instructionHeader')}</h3>
                      <div className="space-y-4 text-sm md:text-base text-foreground/70 leading-relaxed font-body">
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
