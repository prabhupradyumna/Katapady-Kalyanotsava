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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-temple-black p-4">
      <h1 className="text-white">Admin Dashboard (Redirecting to specialized portals...)</h1>
      <p className="text-white/40">Please use /parking or /security for direct management.</p>
    </div>
  );
};

export default AdminDashboard;
