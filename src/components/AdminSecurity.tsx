import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, Trash2, CheckCircle, Lock, LogOut, Camera, Image as ImageIcon, X, AlertCircle, Users } from "lucide-react";
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
    const [viewerCount, setViewerCount] = useState(0);

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
        const unsubViews = onSnapshot(doc(db, "stats", "visitors"), (snapshot) => {
            if (snapshot.exists()) {
                setViewerCount(snapshot.data().count || 0);
            }
        });
        return () => { unsubLost(); unsubFound(); unsubViews(); };
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
            <div className="max-w-6xl mx-auto space-y-4 md:space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-3 border-b border-primary/10 pb-4">
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-2xl md:text-3xl font-heading font-black text-primary uppercase">Security Console</h1>
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/40 mt-1 italic">Event Loss Prevention</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end justify-center px-6 py-3 bg-black/40 border border-primary/20 rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.05)] mx-auto md:mx-4 w-full md:w-auto">
                        <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-1">Total Views</span>
                        <div className="flex items-center gap-3 text-primary">
                            <Users size={18} className="drop-shadow-glow" />
                            <span className="font-heading text-3xl font-black text-gradient-gold leading-none drop-shadow-glow">{viewerCount}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
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

                <div className="bg-card/20 backdrop-blur-xl border border-primary/10 rounded-2xl overflow-hidden overflow-x-auto shadow-2xl">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-primary/5 text-primary text-[9px] uppercase tracking-widest font-black border-b border-primary/10">
                                <th className="px-4 py-4 truncate">Item Details</th>
                                <th className="px-4 py-4">Evidence</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Contact/Finder</th>
                                <th className="px-4 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {adminTab === 'reports' ? (
                                lostReports.map(report => (
                                    <tr key={report.docId} className="hover:bg-primary/5 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="font-bold text-xs md:text-sm">{report.item}</div>
                                            <div className="text-[10px] text-foreground/40 line-clamp-1 italic">{report.description}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            {report.imageUrl ? (
                                                <button onClick={() => setPreviewImage(report.imageUrl)} className="w-10 h-10 border border-primary/20 rounded-lg overflow-hidden"><img src={report.imageUrl} className="w-full h-full object-cover" alt="Item" /></button>
                                            ) : <span className="text-[10px] text-foreground/20 italic">No Photo</span>}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase ${report.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>{report.status}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-[10px] font-bold text-foreground/80">{report.name}</div>
                                            <div className="text-[9px] text-primary/60">{report.phone}</div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex justify-end gap-1.5 md:gap-3">
                                                <button onClick={() => updateDoc(doc(db, "lost_reports", report.docId), { status: 'resolved' })} className="p-2 text-green-500/40 hover:text-green-500 transition-colors" title="Resolve"><CheckCircle size={16} /></button>
                                                <button onClick={() => confirm("Delete report?") && deleteDoc(doc(db, "lost_reports", report.docId))} className="p-2 text-red-500/40 hover:text-red-500 transition-colors" title="Delete"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                foundItems.map(item => (
                                    <tr key={item.docId} className="hover:bg-primary/5 transition-colors">
                                        <td className="px-4 py-4 font-bold text-xs md:text-sm">{item.item}</td>
                                        <td className="px-4 py-4">
                                            {item.imageUrl ? (
                                                <button onClick={() => setPreviewImage(item.imageUrl)} className="w-10 h-10 border border-primary/20 rounded-lg overflow-hidden"><img src={item.imageUrl} className="w-full h-full object-cover" alt="Item" /></button>
                                            ) : <span className="text-[10px] text-foreground/20 italic">No Photo</span>}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase ${item.status === 'claimed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>{item.status}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-[9px] font-black uppercase text-primary/60">{item.location}</div>
                                            <div className="text-[8px] text-foreground/40">{item.date}</div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex justify-end gap-1.5 md:gap-3">
                                                <button onClick={() => updateDoc(doc(db, "found_items", item.docId), { status: 'claimed' })} className="p-2 text-green-500/40 hover:text-green-500 transition-colors" title="Claimed"><CheckCircle size={16} /></button>
                                                <button onClick={() => confirm("Delete entry?") && deleteDoc(doc(db, "found_items", item.docId))} className="p-2 text-red-500/40 hover:text-red-500 transition-colors" title="Delete"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-3">
                    <AlertCircle size={16} className="text-primary shrink-0" />
                    <p className="text-[10px] md:text-xs text-foreground/60 italic font-body">Data synced in real-time with Cloud HQ. Table auto-scrolls horizontally on small screens.</p>
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
