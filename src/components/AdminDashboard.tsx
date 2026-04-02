import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Save, RefreshCw, Car, CheckCircle, AlertCircle, 
  MapPin, Plus, Trash2, PackageSearch, History 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { api, ParkingSpot, LostFoundItem } from "../lib/api";

const AdminDashboard = () => {
  const { t } = useTranslation();
  
  // Parking State
  const [parkingData, setParkingData] = useState<ParkingSpot[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Lost & Found State
  const [lfItems, setLfItems] = useState<LostFoundItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", location: "", date: "", description: "" });

  useEffect(() => {
    setParkingData(api.getParking());
    setLfItems(api.getLostFound());
  }, []);

  // --- Parking Logic ---
  const handleStatusToggle = (id: number) => {
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

  const handleSpacesChange = (id: number, value: string) => {
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

  const handleSaveParking = () => {
    setIsSaving(true);
    setTimeout(() => {
      api.saveParking(parkingData);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  // --- Lost & Found Logic ---
  const handleAddLfItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.location) return;
    const added = api.addFoundItem(newItem);
    setLfItems([added, ...lfItems]);
    setNewItem({ name: "", location: "", date: "", description: "" });
  };

  const handleRemoveLfItem = (id: string) => {
    if (confirm("Delete this entry?")) {
      api.removeFoundItem(id);
      setLfItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-temple-black text-foreground font-body p-4 md:p-8 space-y-12 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-primary/20 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black text-gradient-gold uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-foreground/60 text-sm mt-2 italic italic">Manage real-time parking and lost items</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-card/40 border border-primary/20 rounded-xl hover:bg-card/60 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <RefreshCw className="w-4 h-4" /> Refresh Data
            </button>
          </div>
        </div>

        {/* --- Parking Section --- */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <Car className="w-6 h-6" /> Parking Management
            </h2>
            <button
              onClick={handleSaveParking}
              disabled={isSaving}
              className={`px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center gap-2 shadow-glow transition-all active:scale-95 ${
                saveSuccess 
                  ? "bg-green-600 text-white" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saveSuccess ? "Published!" : "Sync Live Status"}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {parkingData.map((item) => (
                <div 
                  key={item.id}
                  className={`p-6 rounded-3xl border bg-card/20 backdrop-blur-xl transition-all ${
                    item.status === 'available' ? 'border-green-500/30' : 'border-red-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl ${item.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      <Car size={24} />
                    </div>
                    <button
                      onClick={() => handleStatusToggle(item.id)}
                      className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border transition-all ${
                        item.status === 'available'
                          ? 'bg-green-500/20 border-green-500/50 text-green-500 hover:bg-green-500/30'
                          : 'bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30'
                      }`}
                    >
                      {item.status === 'available' ? 'Available' : 'Full'}
                    </button>
                  </div>

                  <h3 className="font-heading font-black text-xl text-primary uppercase mb-2">{item.name}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                      <span>Live Occupancy</span>
                      <span className="text-primary">{item.spaces}% Free</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.spaces}
                      onChange={(e) => handleSpacesChange(item.id, e.target.value)}
                      className="w-full accent-primary h-1.5 bg-primary/10 rounded-full cursor-pointer appearance-none"
                    />
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="h-px bg-primary/10 w-full" />

        {/* --- Lost & Found Section --- */}
        <div className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-primary uppercase tracking-widest flex items-center gap-2">
            <PackageSearch className="w-6 h-6" /> Lost & Found Database
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add Item Form */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[40px] border border-primary/20 shadow-divine">
                <h3 className="font-heading text-xl font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5" /> New Found Entry
                </h3>
                <form onSubmit={handleAddLfItem} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Item name</label>
                    <input 
                      type="text" 
                      value={newItem.name}
                      onChange={e => setNewItem({...newItem, name: e.target.value})}
                      className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-foreground/20"
                      placeholder="e.g. Gold Bracelet"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Location Found</label>
                    <input 
                      type="text" 
                      value={newItem.location}
                      onChange={e => setNewItem({...newItem, location: e.target.value})}
                      className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-foreground/20"
                      placeholder="e.g. Near Seva Counter 2"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Date/Time</label>
                    <input 
                      type="text" 
                      value={newItem.date}
                      onChange={e => setNewItem({...newItem, date: e.target.value})}
                      className="w-full bg-black/40 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all placeholder:text-foreground/20"
                      placeholder="e.g. Today, 11 AM"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-heading font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-glow transition-all"
                  >
                    Post Found Item
                  </button>
                </form>
              </div>
            </div>

            {/* Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-card/20 border border-primary/10 rounded-[40px] p-8 min-h-[500px]">
                 <div className="flex justify-between items-center mb-8">
                   <h3 className="font-heading text-xl font-bold text-gradient-gold uppercase tracking-widest">Active Records</h3>
                   <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">{lfItems.length} found</span>
                 </div>

                 <div className="grid gap-4">
                   {lfItems.length === 0 ? (
                     <div className="py-20 flex flex-col items-center justify-center text-foreground/20 italic">
                       <p>No found items reported yet.</p>
                     </div>
                   ) : (
                     lfItems.map(item => (
                       <div 
                        key={item.id} 
                        className="bg-black/40 border border-primary/10 p-5 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all"
                       >
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                              <PackageSearch size={24} />
                            </div>
                            <div>
                              <h4 className="font-heading font-bold text-lg text-primary uppercase tracking-tight">{item.name}</h4>
                              <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><MapPin size={10} /> {item.location}</span>
                                <span>{item.date}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRemoveLfItem(item.id)}
                            className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                       </div>
                     ))
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
