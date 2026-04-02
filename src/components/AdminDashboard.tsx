import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, Car, CheckCircle, AlertCircle, MapPin, Trash2, PlusCircle, X, Download, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  setDoc,
  getDocs
} from "firebase/firestore";

// Initial mock data that matches ParkingSection
const INITIAL_PARKING_DATA = [
  { id: "lot1", name: "Parking Spot 1", status: "available", spaces: 50, location: "Main Entry" },
  { id: "lot2", name: "Parking Spot 2", status: "available", spaces: 30, location: "Side Ground" },
  { id: "lot3", name: "Parking Spot 3", status: "available", spaces: 20, location: "Back Field" },
  { id: "lot4", name: "Parking Spot 4", status: "available", spaces: 15, location: "Temple Cross" },
  { id: "lot5", name: "Parking Spot 5", status: "available", spaces: 10, location: "VIP Area" },
];

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [parkingData, setParkingData] = useState<any[]>([]);
  const [lostReports, setLostReports] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [adminTab, setAdminTab] = useState<'reports' | 'inventory'>('reports');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newFoundItem, setNewFoundItem] = useState({ item: '', location: '' });

  // Sync with Firestore on mount
  useEffect(() => {
    // 1. Parking Sync
    const unsubParking = onSnapshot(collection(db, "parking"), (snapshot) => {
      if (snapshot.empty) {
        // Initialize Firestore with defaults if empty
        INITIAL_PARKING_DATA.forEach(async (lot) => {
          await setDoc(doc(db, "parking", lot.id), lot);
        });
      } else {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setParkingData(data);
      }
    });

    // 2. Lost Reports Sync
    const qLost = query(collection(db, "lost_reports"), orderBy("id", "desc"));
    const unsubLost = onSnapshot(qLost, (snapshot) => {
      setLostReports(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // 3. Found Items Sync
    const qFound = query(collection(db, "found_items"), orderBy("id", "desc"));
    const unsubFound = onSnapshot(qFound, (snapshot) => {
      setFoundItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubParking();
      unsubLost();
      unsubFound();
    };
  }, []);

  const handleStatusToggle = (id: string) => {
    setParkingData(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: item.status === "available" ? "full" : "available",
          spaces: item.status === "available" ? 0 : item.spaces || 10
        };
      }
      return item;
    }));
  };

  const handleSpacesChange = (id: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setParkingData(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          spaces: numValue,
          status: numValue > 0 ? "available" : "full"
        };
      }
      return item;
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update each lot in Firestore
      const updatePromises = parkingData.map(lot => 
        updateDoc(doc(db, "parking", lot.id), {
          status: lot.status,
          spaces: lot.spaces
        })
      );
      await Promise.all(updatePromises);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to publish status. Check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm("Reset all parking lots to default available status in Cloud?")) {
      const resetPromises = INITIAL_PARKING_DATA.map(lot => 
        updateDoc(doc(db, "parking", lot.id), {
          status: lot.status,
          spaces: lot.spaces
        })
      );
      await Promise.all(resetPromises);
    }
  };

  const handleLogFound = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoundItem.item || !newFoundItem.location) return;

    try {
      await addDoc(collection(db, "found_items"), {
        ...newFoundItem,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        status: 'unclaimed',
        source: 'staff'
      });
      
      setIsLogModalOpen(false);
      setNewFoundItem({ item: '', location: '' });
    } catch (error) {
        console.error("Failed to log founded item:", error);
        alert("Could not log item to Cloud.");
    }
  };

    return (
      <div className="min-h-screen bg-temple-black text-foreground font-body p-2 md:p-8">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-primary/20 pb-4 md:pb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-black text-primary flex items-center gap-3">
                {t('admin.title')}
                <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest text-primary border border-primary/20">
                  Cloud Live
                </span>
              </h1>
              <p className="text-xs md:text-sm text-foreground/40 font-body uppercase tracking-widest mt-1">
                Kalyanotsava Event Management Console
              </p>
            </div>
            
            {/* Auto-Initialization Check */}
            {parkingData.length === 0 && (
              <button 
                onClick={async () => {
                   const INITIAL_LOTS = [
                    { id: "lot1", name: "Parking Spot 1", status: "available", spaces: 50, location: "Main Entry" },
                    { id: "lot2", name: "Parking Spot 2", status: "available", spaces: 30, location: "Side Ground" },
                    { id: "lot3", name: "Parking Spot 3", status: "available", spaces: 20, location: "Back Field" },
                    { id: "lot4", name: "Parking Spot 4", status: "available", spaces: 15, location: "Temple Cross" },
                    { id: "lot5", name: "Parking Spot 5", status: "available", spaces: 10, location: "VIP Area" }
                   ];
                   const promises = INITIAL_LOTS.map(lot => 
                     setDoc(doc(db, "parking", lot.id), lot)
                   );
                   await Promise.all(promises);
                   alert("Cloud initialized with default parking data!");
                }}
                className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500/20 transition-all flex items-center gap-2"
              >
                <RefreshCw size={12} className="animate-spin-slow" />
                Initialize Parking Data
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-card/40 border border-primary/20 rounded-lg md:rounded-xl hover:bg-card/60 transition-colors flex items-center gap-1.5 text-[10px] md:text-sm font-bold uppercase tracking-wider"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl font-bold uppercase tracking-wider text-[10px] md:text-sm flex items-center gap-1.5 shadow-glow transition-all active:scale-95 ${
                  saveSuccess 
                    ? "bg-green-600 text-white" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isSaving ? (
                  <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {saveSuccess ? "Published!" : "Publish Changes"}
              </button>
            </div>
          </div>

          {/* Status Grid */}
          <div className="grid gap-2 md:gap-4 md:grid-cols-2">
            {parkingData.map((item) => (
              <motion.div
                key={item.id}
                layout
                className={`p-2.5 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 bg-card/20 backdrop-blur-xl shadow-lg flex flex-col gap-2 md:gap-4 ${
                  item.status === 'available' ? 'border-green-500/30' : 'border-red-500/30'
                }`}
              >
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
                    <div className={`p-1.5 md:p-3 rounded-lg md:rounded-xl shrink-0 ${item.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      <Car className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-black text-xs md:text-lg text-primary uppercase leading-none truncate">{item.name}</h3>
                      <div className="hidden md:flex items-center gap-1 text-[9px] md:text-xs font-bold uppercase tracking-wider mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-primary/60" />
                        <span className="text-foreground/60">Katapady Ground</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Toggle - Shrink-0 ensures it's always visible */}
                  <button
                    onClick={() => handleStatusToggle(item.id)}
                    className={`shrink-0 px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-bold text-[8px] md:text-[10px] uppercase tracking-widest border transition-all ${
                      item.status === 'available'
                        ? 'bg-green-500/20 border-green-500/50 text-green-500 hover:bg-green-500/30'
                        : 'bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30'
                    }`}
                  >
                    {item.status === 'available' ? 'Available' : 'Full'}
                  </button>
                </div>

                {/* Spaces Input - More compact */}
                <div className={`p-2 md:p-4 rounded-lg md:rounded-xl border border-primary/10 bg-black/20 flex flex-col md:gap-2 ${item.status === 'full' && 'opacity-40 grayscale pointer-events-none'}`}>
                  <label className="hidden md:block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-foreground/50">Current Available Lots</label>
                  <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.spaces}
                      onChange={(e) => handleSpacesChange(item.id, e.target.value)}
                      className="flex-grow min-w-0 accent-primary h-1 bg-primary/10 rounded-full cursor-pointer"
                    />
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="number"
                        value={item.spaces}
                        onChange={(e) => handleSpacesChange(item.id, e.target.value)}
                        className="w-10 md:w-16 bg-black/40 border border-primary/20 rounded-lg px-1 py-1 text-center font-heading font-bold text-primary text-[10px] md:text-base focus:outline-none focus:border-primary/50"
                      />
                      <span className="md:hidden text-[7px] font-bold text-primary opacity-50 uppercase">Lots</span>
                    </div>
                  </div>
                </div>

                {item.status === 'full' && (
                  <div className="px-2 py-1 bg-red-500/5 border border-red-500/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-2.5 h-2.5 text-red-400" />
                    <p className="text-[7px] md:text-[10px] font-bold uppercase tracking-widest text-red-400/80">Visitors will see red indicator</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Lost & Found Management */}
          <div className="pt-8 border-t border-primary/20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-black text-gradient-gold uppercase tracking-tight">Lost & Found Management</h2>
                <p className="text-foreground/60 text-[10px] md:text-sm mt-0.5 md:mt-1 italic md:not-italic">Track visitor reports and manage found inventory</p>
              </div>
              
              <button 
                onClick={() => setIsLogModalOpen(true)}
                className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-primary/20 transition-all font-heading"
              >
                <PlusCircle className="w-4 h-4" /> Log Found Item
              </button>
            </div>

          <div className="flex gap-4 border-b border-primary/10">
            <button 
              onClick={() => setAdminTab('reports')}
              className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${adminTab === 'reports' ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'}`}
            >
              Visitor Lost Reports
              {adminTab === 'reports' && <motion.div layoutId="admTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />}
            </button>
            <button 
              onClick={() => setAdminTab('inventory')}
              className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${adminTab === 'inventory' ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'}`}
            >
              Found Property Inventory
              {adminTab === 'inventory' && <motion.div layoutId="admTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />}
            </button>
          </div>

          <div className="bg-card/20 backdrop-blur-xl border border-primary/10 rounded-2xl overflow-hidden overflow-x-auto">
            {adminTab === 'reports' ? (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-primary/5 text-primary text-[10px] uppercase tracking-widest font-black border-b border-primary/10">
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Item & Description</th>
                    <th className="px-6 py-4">Photo</th>
                    <th className="px-6 py-4">Reporter / Contact</th>
                    <th className="px-6 py-4">Reported On</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 font-body">
                  {lostReports.length > 0 ? (
                    lostReports.map((report: any) => (
                      <tr key={report.id} className="hover:bg-primary/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tighter ${report.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-foreground">{report.item}</div>
                          <div className="text-[10px] text-foreground/40 line-clamp-1 italic">{report.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          {report.imageUrl ? (
                            <button 
                              onClick={() => setPreviewImage(report.imageUrl)} 
                              className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors inline-block"
                              title="View Photo"
                            >
                              <ImageIcon className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-foreground/20 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-foreground/80">{report.name}</div>
                          <div className="text-[10px] text-primary font-mono">{report.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-foreground/50">{report.date}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={async () => {
                                await updateDoc(doc(db, "lost_reports", report.id), { status: 'resolved' });
                              }}
                              className={`p-2 rounded-lg transition-colors ${report.status === 'resolved' ? 'bg-green-500/10 text-green-500 opacity-50 pointer-events-none' : 'hover:bg-green-500/20 text-green-500'}`}
                              title="Mark as Resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={async () => {
                                if(confirm("Delete this report?")) {
                                  await deleteDoc(doc(db, "lost_reports", report.id));
                                }
                              }}
                              className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-foreground/40 italic text-sm">
                        No lost reports filed by visitors yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-primary/5 text-primary text-[10px] uppercase tracking-widest font-black border-b border-primary/10">
                    <th className="px-6 py-4">Claim Status</th>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">Photo</th>
                    <th className="px-6 py-4">Finder / Source</th>
                    <th className="px-6 py-4">Found At</th>
                    <th className="px-6 py-4">Found On</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 font-body">
                  {foundItems.length > 0 ? (
                    foundItems.map((item: any) => (
                      <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tighter ${item.status === 'claimed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-foreground">{item.item}</td>
                        <td className="px-6 py-4">
                          {item.imageUrl ? (
                            <button 
                              onClick={() => setPreviewImage(item.imageUrl)} 
                              className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors inline-block"
                              title="View Photo"
                            >
                              <ImageIcon className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-foreground/20 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-[10px] font-black uppercase tracking-tight ${item.source === 'visitor' ? 'text-blue-400' : 'text-primary'}`}>
                             {item.source === 'visitor' ? 'Visitor Report' : 'Ground Staff'}
                          </div>
                          {item.source === 'visitor' && (
                            <div className="text-[10px] text-foreground/40 mt-0.5">
                              {item.finderName || "Anonymous"} {item.finderPhone && `• ${item.finderPhone}`}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{item.location}</td>
                        <td className="px-6 py-4 text-xs text-foreground/50">{item.date}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={async () => {
                                await updateDoc(doc(db, "found_items", item.id), { status: 'claimed' });
                              }}
                              className={`p-2 rounded-lg transition-colors ${item.status === 'claimed' ? 'bg-green-500/10 text-green-500 opacity-50 pointer-events-none' : 'hover:bg-green-500/20 text-green-500'}`}
                              title="Mark as Claimed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={async () => {
                                if(confirm("Remove this item from inventory?")) {
                                  await deleteDoc(doc(db, "found_items", item.id));
                                }
                              }}
                              className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-foreground/40 italic text-sm">
                        No items in found inventory. Log an item above to display it to visitors.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
        {/* Footer info */}
        <div className="p-3 md:p-4 bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl flex items-start gap-3 md:gap-4">
          <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <p className="text-[10px] md:text-sm text-foreground/60 leading-relaxed font-body italic">
            <strong>Note:</strong> Changes to parking status will be reflected once you click "Publish Changes". Lost & Found updates are saved instantly and will be visible to users immediately.
          </p>
        </div>

        {/* Log Found Item Modal */}
        <AnimatePresence>
          {isLogModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLogModalOpen(false)}
                className="absolute inset-0 bg-temple-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl z-10"
              >
                <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                  <h3 className="font-heading text-xl font-black text-gradient-gold uppercase">Log Found Item</h3>
                  <button onClick={() => setIsLogModalOpen(false)} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary">
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleLogFound} className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80 pl-1">Item Name</label>
                    <input 
                      autoFocus
                      required
                      type="text"
                      value={newFoundItem.item}
                      onChange={(e) => setNewFoundItem({...newFoundItem, item: e.target.value})}
                      placeholder="e.g., Gold Bracelet, Blue Umbrella"
                      className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-foreground transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80 pl-1">Found At (Location)</label>
                    <input 
                      required
                      type="text"
                      value={newFoundItem.location}
                      onChange={(e) => setNewFoundItem({...newFoundItem, location: e.target.value})}
                      placeholder="e.g., Near Entrance, Dining Hall"
                      className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-foreground transition-colors"
                    />
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsLogModalOpen(false)}
                      className="flex-1 py-3 border border-primary/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest shadow-glow hover:bg-primary/90 transition-all font-heading"
                    >
                      Save Item
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      {/* Photo Lightbox */}
      <AnimatePresence>
        {previewImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-temple-black/90 backdrop-blur-xl"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setPreviewImage(null)}
                  className="p-2 bg-black/50 text-white hover:bg-black/80 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <img 
                src={previewImage} 
                alt="Enlarged Preview" 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-primary/5 text-center text-[10px] uppercase font-black tracking-widest text-primary/60">
                Digital Evidence Verification Module
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
