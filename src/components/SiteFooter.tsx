import { motion } from "framer-motion";

const SiteFooter = () => {
  return (
    <footer className="border-t border-primary/10 py-10 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 font-heading text-base font-bold text-foreground/60 uppercase tracking-widest">
          <a href="#home" className="hover:text-primary transition-all">Home</a>
          <a href="#gallery" className="hover:text-primary transition-all">About</a>
          <a href="#sevas" className="hover:text-primary transition-all">Sevas</a>
        </div>

        {/* Contact Numbers */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 font-heading text-lg md:text-xl font-black text-foreground/80">
          <a href="tel:9845242167" className="hover:text-primary transition-colors">9845242167</a>
          <span className="text-primary/20 hidden md:block">•</span>
          <a href="tel:9964578732" className="hover:text-primary transition-colors">9964578732</a>
          <span className="text-primary/20 hidden md:block">•</span>
          <a href="tel:9892012060" className="hover:text-primary transition-colors">9892012060</a>
        </div>

        {/* Symbols & Copyright */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6 text-xl text-primary/40">
            <span title="Om">ॐ</span>
            <span title="Shankha">🔱</span>
            <span title="Lotus">🪷</span>
            <span title="Diya">🪔</span>
          </div>
          <p className="font-body text-foreground/30 text-[10px] uppercase tracking-[0.4em] font-bold">
            ॐ श्री वेंकटेशाय नमः • Govinda Govinda
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
