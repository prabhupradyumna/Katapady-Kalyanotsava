import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Youtube, Facebook, ChevronRight, PlayCircle } from "lucide-react";

const SocialSection = () => {
  const [activeTab, setActiveTab] = useState("instagram");

  // Load Instagram and Facebook SDKs
  useEffect(() => {
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
      document.body.removeChild(igScript);
      document.body.removeChild(fbScript);
    };
  }, []);

  // Process embeds when tab changes
  useEffect(() => {
    if (activeTab === "instagram" && (window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
    }
    if (activeTab === "facebook" && (window as any).FB) {
        (window as any).FB.XFBML.parse();
    }
  }, [activeTab]);

  const tabs = [
    { id: "instagram", label: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
    { id: "youtube", label: "YouTube", icon: Youtube, color: "text-[#FF0000]" },
    { id: "facebook", label: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
  ];

  const instagramReels = [
    'https://www.instagram.com/reel/DUYpivvDLRV/',
    'https://www.instagram.com/reel/DUyEhcOCYdv/',
    'https://www.instagram.com/reel/DUtFdqRjGkT/',
    'https://www.instagram.com/reel/DUbI2FMDMRx/',
    'https://www.instagram.com/reel/DUslyR6jJkP/'
  ];

  const youtubeContent = [
    { id: 1, videoId: "dQw4w9WgXcQ", title: "Sri Venkateswara Hymns", views: "1.2M views" },
    { id: 2, videoId: "jNQXAC9IVRw", title: "Tirumala Morning Prayer", views: "850K views" },
    { id: 3, videoId: "L_jWHffIx5E", title: "Kalyanotsava Rituals", views: "2.5M views" },
  ];

  return (
    <section id="social" className="py-12 md:py-16 bg-temple-deep relative overflow-hidden">
      <div id="fb-root"></div>
      <div className="absolute inset-0 bg-depth-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full border border-primary/20 bg-primary/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Live Updates</span>
          </motion.div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-gradient-gold uppercase leading-tight">
            Divine Community
          </h2>
        </div>

        {/* Tab Controls - More compact */}
        <div className="flex justify-center gap-4 md:gap-6 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 transition-all duration-300 whitespace-nowrap
                ${activeTab === tab.id 
                  ? "bg-primary/10 border-primary text-primary shadow-glow-primary scale-105" 
                  : "bg-black/40 border-primary/10 text-primary/40 hover:border-primary/30 hover:text-primary/60"}
              `}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ""}`} />
              <span className="font-heading font-black text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area - Optimized for one-page visibility */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {activeTab === "instagram" && (
                <div className="w-full flex flex-col items-center">
                  <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-2 w-full max-w-6xl mx-auto">
                    {instagramReels.map((url, idx) => (
                      <div 
                        key={idx} 
                        className="flex-shrink-0 w-[280px] md:w-[320px] h-[450px] bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-intense snap-center relative"
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
                    href="https://www.instagram.com/srinivasa_kalyanotsava_2026?igsh=MWF5bjZneHpuanY3Zg==" 
                    target="_blank" rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-primary font-heading font-black text-xs uppercase tracking-[0.2em] group border-b border-primary/10 hover:border-primary transition-all pb-1"
                  >
                    View on Instagram <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}

              {activeTab === "youtube" && (
                <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-2 w-full max-w-6xl mx-auto">
                  {youtubeContent.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -8 }}
                      className="flex-shrink-0 w-[300px] md:w-[400px] aspect-video bg-black/60 rounded-3xl border border-primary/10 overflow-hidden shadow-intense snap-center relative group"
                    >
                      <div className="w-full h-full bg-sacred-gold/5 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} 
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" 
                          alt={item.title} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-12 h-12 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="font-heading text-lg font-bold text-foreground mb-0.5">{item.title}</p>
                        <p className="text-[10px] text-primary/60 tracking-widest uppercase font-bold">{item.views}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "facebook" && (
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
                      src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61579551701761&tabs=timeline&width=500&height=550&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`} 
                      width="100%" 
                      height="550" 
                      style={{ border: "none", overflow: "hidden" }} 
                      scrolling="no" 
                      frameBorder="0" 
                      allowFullScreen={true} 
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="rounded-[30px]"
                      title="Facebook Page Feed"
                    ></iframe>
                  </motion.div>
                </div>
              )}
            </motion.div>
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
