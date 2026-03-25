import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Youtube, Facebook, ChevronRight, PlayCircle } from "lucide-react";
import clippingImg from "@/assets/youtube-cover.png";

// --- Sub-components for better modularity ---

/**
 * Client-only Instagram Embed Component
 * Loads the external script once on mount.
 */
const InstagramFeed = ({ reels }: { reels: string[] }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-2 w-full max-w-6xl mx-auto">
        {reels.map((url, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-[220px] md:w-[320px] h-[350px] md:h-[450px] bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-intense snap-center relative"
          >
            <blockquote 
                className="instagram-media w-full h-full m-0 p-0" 
                data-instgrm-permalink={url} 
                data-instgrm-version="14"
            ></blockquote>
          </div>
        ))}
      </div>
      <a 
        href="https://www.instagram.com/srinivasakalyanotsava_katapady?igsh=MXhpb2E0d3N1OTB0bw==" 
        target="_blank" rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-primary font-heading font-black text-xs uppercase tracking-[0.2em] group border-b border-primary/10 hover:border-primary transition-all pb-1"
      >
        View on Instagram <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

/**
 * Client-only YouTube Feed Component
 */
const YoutubeFeed = ({ content }: { content: any[] }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className={`flex gap-6 pb-6 px-2 w-full max-w-6xl mx-auto ${content.length <= 1 ? "justify-center" : "overflow-x-auto snap-x snap-mandatory scrollbar-hide"}`}>
        {content.map((item: any) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -8 }}
            className="flex-shrink-0 w-[300px] md:w-[400px] aspect-video bg-black/60 rounded-3xl border border-primary/10 overflow-hidden shadow-intense snap-center relative group"
          >
            <a 
              href={item.type === "video" ? `https://www.youtube.com/watch?v=${item.videoId}` : item.url} 
              target="_blank" 
              rel="noreferrer"
              className="w-full h-full block"
            >
              <div className="w-full h-full bg-sacred-gold/5 flex items-center justify-center relative overflow-hidden">
                {item.type === "video" ? (
                  <>
                    <img 
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" 
                      alt={item.title} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full relative">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" 
                      alt={item.title} 
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                        <ChevronRight className="w-8 h-8 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="font-heading text-lg font-bold text-foreground mb-0.5 line-clamp-1">{item.title}</p>
                <p className="text-[10px] text-primary/60 tracking-widest uppercase font-bold">{item.subtitle || item.views}</p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      <a 
        href="https://www.youtube.com/@SunMatrixMusic/posts" 
        target="_blank" rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-primary font-heading font-black text-xs uppercase tracking-[0.2em] group border-b border-primary/10 hover:border-primary transition-all pb-1"
      >
        View on YouTube <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

/**
 * Client-only Facebook Feed Component
 */
const FacebookFeed = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6">
        <a 
          href="https://www.facebook.com/profile.php?id=61579551701761"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] font-heading font-black text-sm rounded-xl hover:bg-[#1877F2] hover:text-white transition-all group"
        >
          <Facebook className="w-4 h-4" />
          View Official Profile
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <motion.div
        className="w-full max-w-[500px] h-[550px] bg-card/20 backdrop-blur-xl rounded-[30px] border border-primary/20 shadow-divine relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary/5 animate-pulse flex flex-col items-center justify-center -z-10 text-center p-8">
          <Facebook className="w-12 h-12 text-primary/10" />
        </div>
        <iframe 
          src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61579551701761&tabs=timeline&width=500&height=450&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`} 
          width="100%" 
          height="450" 
          style={{ border: "none", overflow: "hidden" }} 
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="rounded-[30px] h-[450px] md:h-[550px]"
          title="Facebook Page Feed"
        ></iframe>
      </motion.div>
    </div>
  );
};

// --- Main SocialSection Component ---

const SocialSection = () => {
  const [activeTab, setActiveTab] = useState("instagram");
  const [isMounted, setIsMounted] = useState(false);

  // Load External Scripts ONLY on Client Side
  useEffect(() => {
    setIsMounted(true);

    // Instagram Script
    const igScript = document.createElement("script");
    igScript.src = "https://www.instagram.com/embed.js";
    igScript.async = true;
    document.body.appendChild(igScript);

    // Facebook SDK
    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0";
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    document.body.appendChild(fbScript);

    return () => {
      if (document.body.contains(igScript)) document.body.removeChild(igScript);
      if (document.body.contains(fbScript)) document.body.removeChild(fbScript);
    };
  }, []);

  // Process embeds when tab changes (Client Side Only)
  useEffect(() => {
    if (!isMounted) return;

    if (activeTab === "instagram" && typeof window !== 'undefined' && (window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
    }
    if (activeTab === "facebook" && typeof window !== 'undefined' && (window as any).FB) {
        (window as any).FB.XFBML.parse();
    }
  }, [activeTab, isMounted]);

  const tabs = [
    { id: "instagram", label: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
    { id: "youtube", label: "YouTube", icon: Youtube, color: "text-[#FF0000]" },
    { id: "facebook", label: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
  ];

  const instagramReels = [
    'https://www.instagram.com/reel/DWL3tYME1HC/',
    'https://www.instagram.com/p/DWNtMoCkjQI/',
    'https://www.instagram.com/p/DWNs-9OknsL/',
    'https://www.instagram.com/p/DWJUMXzE7fn/'
  ];

  const youtubeContent = [
    { 
      id: "post1", 
      type: "post",
      url: "https://www.youtube.com/post/UgkxRqRziV4vgH1WFNZWowlp_dwOLGA96OSB",
      image: clippingImg,
      title: "ಕಟಪಾಡಿಯಲ್ಲಿ ಶ್ರೀನಿವಾಸ ಕಲ್ಯಾಣ: ಪೂರ್ವಭಾವಿ ಸಭೆ", 
      subtitle: "Sun Matrix Music Update",
      views: "Community Post" 
    }
  ];

  return (
    <section id="social" className="py-4 md:py-6 bg-temple-deep relative overflow-hidden optimize-gpu">
      <div id="fb-root"></div>
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-4 md:mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full border border-primary/20 bg-primary/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Live Updates</span>
          </motion.div>
          <h2 className="font-heading text-2xl md:text-4xl font-black text-gradient-gold uppercase leading-tight">
            Divine Community
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-3 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-xl border-2 transition-all duration-300 whitespace-nowrap
                ${activeTab === tab.id 
                  ? "bg-primary/10 border-primary text-primary shadow-glow-primary scale-105" 
                  : "bg-black/40 border-primary/10 text-primary/40 hover:border-primary/30 hover:text-primary/60"}
              `}
            >
              <tab.icon className={`w-3 h-3 md:w-4 md:h-4 ${activeTab === tab.id ? tab.color : ""}`} />
              <span className="font-heading font-black text-sm md:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area - Client Side Guarded */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {!isMounted ? (
                // Skeleton/Placeholder during SSR/Mounting
                <div key="loading" className="w-full flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            ) : (
                <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
                >
                {activeTab === "instagram" && <InstagramFeed reels={instagramReels} />}
                {activeTab === "youtube" && <YoutubeFeed content={youtubeContent} />}
                {activeTab === "facebook" && <FacebookFeed />}
                </motion.div>
            )}
          </AnimatePresence>

          {/* Scrolling Hints */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-temple-deep to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-temple-deep to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
