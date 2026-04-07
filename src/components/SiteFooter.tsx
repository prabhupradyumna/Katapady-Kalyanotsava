import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SiteFooter = () => {
  const { t } = useTranslation();
  return (
    <footer id="footer" className="border-t border-primary/10 pt-6 pb-20 md:pb-16 bg-temple-black relative overflow-hidden">
      <div className="absolute inset-0 bg-depth-grid opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 font-heading text-sm font-bold text-foreground/60 uppercase tracking-widest">
          <a href="#home" className="hover:text-primary transition-all">{t('nav.home')}</a>
          <a href="#gallery" className="hover:text-primary transition-all">{t('nav.about')}</a>
          <a href="#sevas" className="hover:text-primary transition-all">{t('nav.sevas')}</a>
        </div>

        {/* Contact Numbers */}
        <div id="contact" className="flex flex-col items-center gap-2 mb-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-heading text-lg md:text-xl font-black text-foreground/80">
            <a href="tel:9845242167" className="hover:text-primary transition-colors">9845242167</a>
            <span className="text-primary/20 hidden md:block">•</span>
            <a href="tel:9964578732" className="hover:text-primary transition-colors">9964578732</a>
            <span className="text-primary/20 hidden md:block">•</span>
            <a href="tel:9892012060" className="hover:text-primary transition-colors">9892012060</a>
          </div>
          <div className="flex items-center gap-2 text-primary/60 font-body text-xs md:text-sm uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-primary/10">
            <span>🚗</span> {t('footer.parking')}
          </div>
        </div>

        {/* Symbols & Copyright */}
        <div className="flex flex-col items-center gap-2">
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

        {/* Made By Credit */}
        <div className="mt-8 pt-6 border-t border-primary/10 w-full flex flex-col items-center gap-3">
          <p className="font-body text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest font-bold mb-1">
            {t('footer.designedBy')}
          </p>
          <a
            href="https://invenger.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <img 
              src="/invenger-logo.png" 
              alt="Invenger Technologies" 
              className="h-8 md:h-10 w-auto object-contain bg-white/90 p-2 rounded-md shadow-sm" 
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
