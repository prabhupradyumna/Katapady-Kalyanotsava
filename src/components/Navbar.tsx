import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sevas", href: "#sevas" },
  { label: "Location", href: "#location" },
  { label: "Parking", href: "#parking" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (typeof window === 'undefined') return;
          setScrolled(window.scrollY > 20);

          const navHeight = 150;
          const sections = navLinks.map((l) => l.href.slice(1));
          
          // Special case: Bottom of page
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            setActive(sections[sections.length - 1]);
          } else {
            for (let i = sections.length - 1; i >= 0; i--) {
              const el = document.getElementById(sections[i]);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= navHeight) {
                  setActive(sections[i]);
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-divine"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-3 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-gradient-gold leading-relaxed md:leading-loose drop-shadow-glow pl-1 pr-4 inline-flex items-center">
          <img src="/tilak-logo.png" alt="Tilak Logo" className="h-8 md:h-12 w-auto mr-2 drop-shadow-glow" /> Srinivasa Kalyanotsava
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-lg transition-all duration-300 relative pb-0.5 ${
                active === link.href.slice(1)
                  ? "text-primary scale-110 font-bold"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {link.label}
              {active === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,183,0,0.8)]"
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary p-2 w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full border border-primary/20"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-temple-black/95 backdrop-blur-2xl z-[70] md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <button 
                onClick={() => setMobileOpen(false)}
                className="absolute top-8 right-8 text-primary"
              >
                <X size={40} />
              </button>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-heading text-4xl ${
                    active === link.href.slice(1) ? "text-primary font-bold" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
