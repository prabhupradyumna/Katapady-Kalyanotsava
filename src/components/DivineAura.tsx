import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const DivineAura = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out the movement with springs
  const springConfig = { damping: 25, stiffness: 150 };
  const sprX = useSpring(mouseX, springConfig);
  const sprY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
        if (!isVisible) setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      style={{
        left: sprX,
        top: sprY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      className="fixed pointer-events-none z-[100] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full"
    >
      {/* Outer Divine Glow */}
      <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
      
      {/* Inner Sacred Center */}
      <div className="absolute inset-[40%] bg-primary/10 blur-[40px] rounded-full animate-pulse" />
      
      {/* Mobile-optimized small dot for precision */}
      <div className="absolute inset-[48%] w-4 h-4 bg-primary/20 blur-[4px] rounded-full md:hidden" />
    </motion.div>
  );
};

export default DivineAura;
