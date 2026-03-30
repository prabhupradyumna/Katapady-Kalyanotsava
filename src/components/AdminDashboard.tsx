import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, RefreshCw, Car, CheckCircle, AlertCircle, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

// Initial mock data that matches ParkingSection
const INITIAL_PARKING_DATA = [
  { id: 1, name: "Parking Spot 1", status: "available", spaces: 50 },
  { id: 2, name: "Parking Spot 2", status: "available", spaces: 30 },
  { id: 3, name: "Parking Spot 3", status: "available", spaces: 20 },
  { id: 4, name: "Parking Spot 4", status: "available", spaces: 15 },
  { id: 5, name: "Parking Spot 5", status: "available", spaces: 10 },
];

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [parkingData, setParkingData] = useState(INITIAL_PARKING_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("parking_status_data");
    if (savedData) {
      setParkingData(JSON.parse(savedData));
    }
  }, []);

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

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem("parking_status_data", JSON.stringify(parkingData));
      // Dispatch a custom event so other components know to update
      window.dispatchEvent(new CustomEvent("parkingStatusUpdated", { detail: parkingData }));
      
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleReset = () => {
    if (confirm("Reset all parking lots to default available status?")) {
      setParkingData(INITIAL_PARKING_DATA);
    }
  };

  return (
    <div className="min-h-screen bg-temple-black text-foreground font-body p-2 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-primary/20 pb-4 md:pb-6">
          <div>
            <h1 className="font-heading text-xl md:text-4xl font-black text-gradient-gold uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-foreground/60 text-[10px] md:text-sm mt-0.5 md:mt-1 italic md:not-italic">Manage real-time parking availability</p>
          </div>
          <div className="flex gap-2">
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
        
        {/* Footer info */}
        <div className="p-3 md:p-4 bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl flex items-start gap-3 md:gap-4">
          <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg shrink-0">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <p className="text-[10px] md:text-sm text-foreground/60 leading-relaxed font-body italic">
            <strong>Note:</strong> Changes will be reflected once you click "Publish Changes". The visitors' mobile page will automatically refresh with the new counts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
