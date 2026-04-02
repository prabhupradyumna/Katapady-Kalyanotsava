
// This is a centralized API layer that currently uses localStorage 
// but is designed to be easily swapped for Firebase once the backend is ready.

export interface ParkingSpot {
  id: number;
  name: string;
  status: 'available' | 'full';
  spaces: number;
}

export interface LostFoundItem {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  image?: string;
  status: 'found' | 'claimed';
}

const STORAGE_KEYS = {
  PARKING: "parking_status_data",
  LOST_FOUND: "lost_found_items_data"
};

const INITIAL_PARKING: ParkingSpot[] = [
  { id: 1, name: "Parking Spot 1", status: "available", spaces: 50 },
  { id: 2, name: "Parking Spot 2", status: "available", spaces: 30 },
  { id: 3, name: "Parking Spot 3", status: "available", spaces: 20 },
  { id: 4, name: "Parking Spot 4", status: "available", spaces: 15 },
  { id: 5, name: "Parking Spot 5", status: "available", spaces: 10 },
];

export const api = {
  // Parking Methods
  getParking: (): ParkingSpot[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.PARKING);
    return saved ? JSON.parse(saved) : INITIAL_PARKING;
  },
  
  saveParking: (data: ParkingSpot[]) => {
    localStorage.setItem(STORAGE_KEYS.PARKING, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("parkingStatusUpdated", { detail: data }));
  },

  // Lost & Found Methods
  getLostFound: (): LostFoundItem[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOST_FOUND);
    return saved ? JSON.parse(saved) : [];
  },

  saveLostFound: (items: LostFoundItem[]) => {
    localStorage.setItem(STORAGE_KEYS.LOST_FOUND, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("lostFoundUpdated", { detail: items }));
  },
  
  addFoundItem: (item: Omit<LostFoundItem, 'id' | 'status'>) => {
    const items = api.getLostFound();
    const newItem: LostFoundItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      status: 'found'
    };
    api.saveLostFound([newItem, ...items]);
    return newItem;
  },

  removeFoundItem: (id: string) => {
    const items = api.getLostFound();
    api.saveLostFound(items.filter(item => item.id !== id));
  }
};
