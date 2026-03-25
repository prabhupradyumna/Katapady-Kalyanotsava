import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollReveal = (amount = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });
  
  const divineVariant = {
    hidden: { 
      opacity: 0, 
      filter: "blur(20px) brightness(0.5)", 
      y: 30, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      filter: "blur(0px) brightness(1)", 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  };

  return { ref, isInView, divineVariant: divineVariant as any };
};
