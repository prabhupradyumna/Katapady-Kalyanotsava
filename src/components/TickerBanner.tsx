import { motion } from "framer-motion";

const TickerBanner = () => {
  const disclaimerText = "No collections or donations should be made in the name of Tirupathi by any individual without authorization. ✦ ";

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full overflow-hidden bg-[#3A0202] py-2 border-t border-primary/20 z-[100] selection:bg-primary/20 backdrop-blur-sm">
        <div className="flex whitespace-nowrap">
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                    duration: 180,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ willChange: "transform" }}
                className="flex items-center translate-z-0"
            >
                {/* Text repeated many times for extreme smoothness and long loop */}
                <span className="font-body text-[13px] md:text-sm text-[#FFD700]/70 tracking-[0.2em] font-medium uppercase inline-block">
                    {Array(8).fill(disclaimerText).join(" ")}
                </span>
            </motion.div>
        </div>
        
        {/* Soft edge masking for eye comfort */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#3A0202] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#3A0202] to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default TickerBanner;
