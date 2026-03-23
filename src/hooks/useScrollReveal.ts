import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollReveal = (amount = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });
  return { ref, isInView };
};
