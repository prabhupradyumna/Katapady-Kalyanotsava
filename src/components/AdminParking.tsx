import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, Car, CheckCircle, AlertCircle, MapPin, Lock, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/firebase";
import { collection, onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore";

const INITIAL_PARKING_DATA = [
  { id: "lot1", name: "Parking Spot 1", status: "available", spaces: 50, location: "Main Entry" },
  { id: "lot2", name: "Parking Spot 2", status: "available", spaces: 30, location: "Side Ground" },
  { id: "lot3", name: "Parking Spot 3", status: "available", spaces: 20, location: "Back Field" },
  { id: "lot4", name: "Parking Spot 4", status: "available", spaces: 15, location: "Temple Cross" },
  { id: "lot5", name: "Parking Spot 5", status: "available", spaces: 10, location: "VIP Area" },
];

const AdminParking = () => {
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [parkingData, setParkingData] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) return;
        const unsub = onSnapshot(collection(db, "parking"), (snapshot) => {
            if (snapshot.empty) {
                INITIAL_PARKING_DATA.forEach(async (lot) => {
                    await setDoc(doc(db, "parking", lot.id), lot);
                });
            } else {
                setParkingData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
        });
        return () => unsub();
    }, [isLoggedIn]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "katapady2026") setIsLoggedIn(true);
        else alert("Invalid credentials.");
    };

    const handleStatusToggle = (id: string) => {
        setParkingData(prev => prev.map(item => item.id === id ? { ...item, status: item.status === "available" ? "full" : "available", spaces: item.status === "available" ? 0 : 10 } : item));
    };

    const handleSpacesChange = (id: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setParkingData(prev => prev.map(item => item.id === id ? { ...item, spaces: numValue, status: numValue > 0 ? "available" : "full" } : item));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await Promise.all(parkingData.map(lot => updateDoc(doc(db, "parking", lot.id), { status: lot.status, spaces: lot.spaces })));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) { alert("Cloud sync failed."); }
        finally { setIsSaving(false); }
    };

    const handleReset = async () => {
        if (confirm("Reset cloud parking to defaults?")) {
            await Promise.all(INITIAL_PARKING_DATA.map(lot => updateDoc(doc(db, "parking", lot.id), { status: lot.status, spaces: lot.spaces })));
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-[100dvh] bg-temple-black flex items-center justify-center p-6">
                <motion.form 
                    initial={{opacity:0, scale:0.9}} 
                    animate={{opacity:1, scale:1}} 
                    onSubmit={handleLogin} 
                    className="w-full max-w-sm bg-card border border-primary/30 p-8 rounded-[2.5rem] space-y-6 shadow-2xl backdrop-blur-3xl relative"
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-xl">
                        <Lock className="text-primary" size={40} />
                    </div>
                    <div className="text-center pt-8 space-y-2">
                        <h1 className="text-2xl font-heading font-black text-gradient-gold uppercase tracking-tighter">Authorized Gate</h1>
                        <p className="text-[10px] text-foreground/40 font-bold tracking-widest uppercase italic">Parking Control Access</p>
                    </div>
                    <div className="space-y-3">
                        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/40 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:border-primary/50 transition-all outline-none text-center" />
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:border-primary/50 transition-all outline-none text-center" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-heading font-black text-sm uppercase tracking-widest shadow-glow active:scale-95 transition-all">Unlock Dashboard</button>
                    <p className="text-[9px] text-center text-foreground/20 italic mt-4">Safe & Secure Event Logistics</p>
                </motion.form>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-temple-black text-foreground font-body p-3 md:p-8">
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-primary/10 pb-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-heading font-black text-primary uppercase">Gate Management</h1>
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/40 mt-1">Katapady Ground Control</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={handleReset} className="px-3 py-2 border border-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:bg-primary/5"><RefreshCw size={12} /> Reset</button>
                        <button onClick={handleSave} disabled={isSaving} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-glow ${saveSuccess ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground'}`}>
                            {isSaving ? <RefreshCw className="animate-spin" size={12} /> : saveSuccess ? <CheckCircle size={12} /> : <Save size={12} />}
                            {saveSuccess ? "Saved!" : "Update"}
                        </button>
                        <button onClick={() => setIsLoggedIn(false)} className="ml-2 p-2 text-foreground/40 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-3 md:gap-6">
                    {parkingData.map((item) => (
                        <motion.div key={item.id} layout className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] border bg-card/40 backdrop-blur-3xl shadow-xl space-y-4 transition-all ${item.status === 'available' ? 'border-green-500/20' : 'border-red-500/20'}`}>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className={`p-3 md:p-4 rounded-2xl ${item.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}><Car size={24} /></div>
                                <h3 className="font-heading font-black text-xs md:text-lg text-primary uppercase leading-tight truncate w-full">{item.name}</h3>
                                <button onClick={() => handleStatusToggle(item.id)} className={`w-full py-2 rounded-xl font-black text-[9px] md:text-[11px] uppercase tracking-widest border transition-all ${item.status === 'available' ? 'bg-green-500/20 border-green-500/40 text-green-500 shadow-[0_0_15px_-5px_rgba(34,197,94,0.4)]' : 'bg-red-500/20 border-red-500/40 text-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.4)]'}`}>{item.status}</button>
                            </div>

                            <div className={`p-3 md:p-5 rounded-2xl border border-primary/10 bg-black/30 space-y-2 ${item.status === 'full' && 'opacity-30 grayscale pointer-events-none'}`}>
                                <div className="flex justify-between text-[8px] md:text-[10px] uppercase font-black text-foreground/40"><span>Capacity</span><span>{item.spaces}</span></div>
                                <input type="range" min="0" max="100" value={item.spaces} onChange={(e) => handleSpacesChange(item.id, e.target.value)} className="w-full accent-primary h-1.5 bg-primary/10 rounded-full cursor-pointer" />
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="text-primary mt-1" size={18} />
                    <p className="text-xs text-foreground/60 leading-relaxed font-body italic">Status updates will be pushed to the public "Live Parking" view only when "Publish Changes" is clicked. Ensure accuracy before publishing.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminParking;
