import { Variants } from 'framer-motion';

export const launcherVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export const windowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20, transformOrigin: "bottom right" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300, mass: 0.8 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20, 
    transition: { duration: 0.2 } 
  }
};

export const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const chipVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 200 } }
};
