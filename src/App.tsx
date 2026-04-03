import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminDashboard from "./components/AdminDashboard.tsx";
import AdminParking from "./components/AdminParking.tsx";
import AdminSecurity from "./components/AdminSecurity.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useEffect } from "react";
import { db } from "./lib/firebase";
import { doc, setDoc, increment } from "firebase/firestore";

const queryClient = new QueryClient();

const ViewTracker = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
      setDoc(doc(db, "stats", "visitors"), { count: increment(1) }, { merge: true })
        .catch(e => console.error("Analytics ping failed:", e));
    }
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ViewTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/parking" element={<AdminParking />} />
          <Route path="/security" element={<AdminSecurity />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
