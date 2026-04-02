import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, Trash2, CheckCircle, Lock, LogOut, Camera, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/firebase";
import { collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc, query, orderBy } from "firebase/firestore";

const AdminSecurity = () => {
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [lostReports, setLostReports] = useState<any[]>([]);
    const [foundItems, setFoundItems] = useState<any[]>([]);
    const [adminTab, setAdminTab] = useState<'reports' | 'inventory'>('reports');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [newFoundItem, setNewFoundItem] = useState({ item: '', location: '' });

    useEffect(() => {
        if (!isLoggedIn) return;
        const qLost = query(collection(db, "lost_reports"), orderBy("date", "desc"));
        const unsubLost = onSnapshot(qLost, (snapshot) => {
            setLostReports(snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
        });
        const qFound = query(collection(db, "found_items"), orderBy("date", "desc"));
        const unsubFound = onSnapshot(qFound, (snapshot) => {
            setFoundItems(snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
        });
        return () => { unsubLost(); unsubFound(); };
    }, [isLoggedIn]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "kalyana2026") setIsLoggedIn(true);
        else alert("Invalid credentials.");
    };

    const handleLogFound = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFoundItem.item || !newFoundItem.location) return;
        try {
            await addDoc(collection(db, "found_items"), {
                ...newFoundItem,
                id: Date.now().toString(),
                date: new Date().toLocaleDateString(),
                status: 'unclaimed',
                source: 'staff',
                imageUrl: ''
            });
            setIsLogModalOpen(false);
            setNewFoundItem({ item: '', location: '' });
        } catch (error) { console.error("Log failed:", error); }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-[100dvh] bg-temple-black flex items-center justify-center p-6">
                <motion.form 
                    initial={{opacity:0, scale:0.95}} 
                    animate={{opacity:1, scale:1}} 
                    onSubmit={handleLogin} 
                    className="w-full max-w-sm bg-card border border-primary/30 p-8 rounded-[2.5rem] space-y-6 shadow-2xl backdrop-blur-3xl relative"
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-xl">
                        <Lock className="text-primary" size={40} />
                    </div>
                    <div className="text-center pt-8 space-y-2">
                        <h1 className="text-2xl font-heading font-black text-gradient-gold uppercase tracking-tighter">Security Vault</h1>
                        <p className="text-[10px] text-foreground/40 font-bold tracking-widest uppercase italic">Operational Oversight</p>
                    </div>
                    <div className="space-y-3">
                        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/40 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:border-primary/50 transition-all outline-none text-center" />
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:border-primary/50 transition-all outline-none text-center" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-heading font-black text-sm uppercase tracking-widest shadow-glow active:scale-95 transition-all">Unlock Ledger</button>
                    <p className="text-[9px] text-center text-foreground/20 italic mt-4">Authorized Security Personnel Only</p>
                </motion.form>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-temple-black text-foreground font-body p-3 md:p-8">
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-primary/10 pb-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-heading font-black text-primary uppercase">Security Console</h1>
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/40 mt-1 italic">Event Loss Prevention</p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-3">
                        <button onClick={() => setIsLogModalOpen(true)} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/20 transition-all">
                            <PlusCircle size={14} /> Log Found
                        </button>
                        <button onClick={() => setIsLoggedIn(false)} className="text-foreground/40 hover:text-red-500 transition-colors p-2"><LogOut size={22} /></button>
                    </div>
                </header>

                <div className="flex gap-4 border-b border-primary/10 px-2">
                    <button onClick={() => setAdminTab('reports')} className={`pb-2 text-[10px] md:text-xs font-bold uppercase tracking-widest relative ${adminTab === 'reports' ? 'text-primary' : 'text-foreground/40'}`}>
                        Visitor Reports {adminTab === 'reports' && <motion.div layoutId="secTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                    <button onClick={() => setAdminTab('inventory')} className={`pb-2 text-[10px] md:text-xs font-bold uppercase tracking-widest relative ${adminTab === 'inventory' ? 'text-primary' : 'text-foreground/40'}`}>
                        Inventory {adminTab === 'inventory' && <motion.div layoutId="secTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                </div>

                <div className="space-y-3">
                    {adminTab === 'reports' ? (
                        lostReports.map(report => (
                            <motion.div key={report.docId} layout className="bg-card/40 backdrop-blur-3xl border border-primary/10 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center shrink-0">
                                        {report.imageUrl ? (
                                            <button onClick={() => setPreviewImage(report.imageUrl)} className="w-full h-full"><img src={report.imageUrl} className="w-full h-full object-cover rounded-lg" alt="Item" /></button>
                                        ) : (
                                            <ImageIcon className="text-primary/20" size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-sm md:text-base">{report.item}</h3>
                                            <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase ${report.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>{report.status}</span>
                                        </div>
                                        <p className="text-[10px] text-foreground/40 line-clamp-1">{report.description}</p>
                                        <div className="text-[10px] text-primary/60 font-bold mt-1">{report.name} • {report.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2 border-t md:border-t-0 border-primary/5 pt-3 md:pt-0">
                                    <button onClick={() => updateDoc(doc(db, "lost_reports", report.docId), { status: 'resolved' })} className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:bg-green-500/20"><CheckCircle size={14} /> Resolve</button>
                                    <button onClick={() => confirm("Delete report?") && deleteDoc(doc(db, "lost_reports", report.docId))} className="p-2 text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        foundItems.map(item => (
                            <motion.div key={item.docId} layout className="bg-card/40 backdrop-blur-3xl border border-primary/10 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center shrink-0">
                                        {item.imageUrl ? (
                                            <button onClick={() => setPreviewImage(item.imageUrl)} className="w-full h-full"><img src={item.imageUrl} className="w-full h-full object-cover rounded-lg" alt="Item" /></button>
                                        ) : (
                                            <ImageIcon className="text-primary/20" size={20} />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-sm md:text-base">{item.item}</h3>
                                            <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase ${item.status === 'claimed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>{item.status}</span>
                                        </div>
                                        <p className="text-[10px] text-foreground/40 italic">Found at: {item.location}</p>
                                        <div className="text-[10px] text-primary/60 font-bold mt-1">Logged on: {item.date}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2 border-t md:border-t-0 border-primary/5 pt-3 md:pt-0">
                                    <button onClick={() => updateDoc(doc(db, "found_items", item.docId), { status: 'claimed' })} className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:bg-green-500/20"><CheckCircle size={14} /> Claimed</button>
                                    <button onClick={() => confirm("Delete entry?") && deleteDoc(doc(db, "found_items", item.docId))} className="p-2 text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {previewImage && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPreviewImage(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-temple-black/95 backdrop-blur-xl pointer-events-auto">
                        <div className="relative max-w-2xl w-full bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full z-10 hover:bg-black/80 transition-colors"><X size={20} /></button>
                            <img src={previewImage} className="w-full h-auto max-h-[80vh] object-contain" alt="HD Preview" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {isLogModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-temple-black/80 backdrop-blur-sm">
                        <motion.form initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} onSubmit={handleLogFound} className="w-full max-w-md bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
                                <h3 className="font-heading text-xl font-black text-gradient-gold uppercase">Log Found Item</h3>
                                <button onClick={() => setIsLogModalOpen(false)} className="text-primary hover:bg-primary/10 rounded-full p-1 transition-all"><X size={20} /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Item Title</label>
                                    <input type="text" placeholder="e.g., Gold Ring, Smartphone" required value={newFoundItem.item} onChange={(e) => setNewFoundItem({...newFoundItem, item: e.target.value})} className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 text-foreground transition-all outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1">Discovery Location</label>
                                    <input type="text" placeholder="e.g., Near Entrance Gate" required value={newFoundItem.location} onChange={(e) => setNewFoundItem({...newFoundItem, location: e.target.value})} className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 text-foreground transition-all outline-none" />
                                </div>
                                <button type="submit" className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-heading font-black text-sm uppercase tracking-widest shadow-glow hover:brightness-110 active:scale-95 transition-all mt-2">
                                    Finalize Ledger Entry
                                </button>
                            </div>
                        </motion.form>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminSecurity;
