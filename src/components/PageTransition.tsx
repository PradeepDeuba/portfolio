import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.8,
};

/**
 * Purely presentational. This component used to also mutate
 * documentElement/body on mount and undo some of it on unmount, which fought
 * with the equivalent effect in App.tsx. Theme and page classes now live in
 * index.html, so there is nothing imperative left to do here.
 */
const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="min-h-screen w-full overflow-x-hidden bg-black text-white"
  >
    {/* Gradient orbs for background effect */}
    <div
      aria-hidden="true"
      className="fixed -top-64 -right-64 w-[40rem] h-[40rem] bg-purple-500/5 rounded-full blur-3xl pointer-events-none z-0"
    />
    <div
      aria-hidden="true"
      className="fixed -bottom-64 -left-64 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0"
    />
    <div
      aria-hidden="true"
      className="fixed top-1/3 left-1/4 w-[20rem] h-[20rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0 animate-float"
    />
    {children}
  </motion.div>
);

export default PageTransition;
