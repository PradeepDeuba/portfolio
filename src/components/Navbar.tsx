import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * A ripple is scoped to the nav item it was created in. Previously a single
 * shared array was rendered inside every item, so clicking one link drew a
 * ripple in all of them.
 */
interface Ripple {
  path: string;
  x: number;
  y: number;
  id: number;
}

const rippleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 1, 0],
    scale: 5,
    transition: { duration: 0.6 },
  },
};

/**
 * Navigation. The dropdown is the only navigation control for every viewport
 * width — the previous code also carried a mobile menu button and panel, but
 * both were permanently hidden (`hidden` plus `md:hidden`), so ~70 lines of
 * state, markup and an AnimatePresence block were unreachable. Removed.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [ripple, setRipple] = useState<Ripple | null>(null);
  const rippleTimeout = useRef<number | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => () => window.clearTimeout(rippleTimeout.current), []);

  const handleCreateRipple = (
    path: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setRipple({
      path,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });

    window.clearTimeout(rippleTimeout.current);
    rippleTimeout.current = window.setTimeout(() => setRipple(null), 600);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10 py-5",
        {
          "bg-black/80 backdrop-blur-md shadow-sm": isScrolled,
          "bg-transparent": !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-xl md:text-2xl font-display font-semibold"
          aria-label={`${site.name} home`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            {site.name}
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open navigation menu"
            className="flex items-center text-white hover:text-primary transition-colors bg-black/50 px-3 py-2 rounded-md border border-white/10"
          >
            <span className="mr-1">Menu</span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black/90 backdrop-blur-md border border-white/10 shadow-lg rounded-md z-50">
            {site.nav.map((item) => {
              const isCurrent = location.pathname === item.path;

              return (
                <DropdownMenuItem key={item.name} className="focus:bg-gray-800">
                  <Link
                    to={item.path}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "w-full text-sm font-medium relative flex items-center py-1.5 px-3",
                      isCurrent
                        ? "text-primary"
                        : "text-white/80 hover:text-white"
                    )}
                    onClick={(e) => handleCreateRipple(item.path, e)}
                  >
                    {item.name}
                    {isCurrent && (
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                        layoutId="navbar-indicator"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.5,
                        }}
                      />
                    )}

                    {ripple?.path === item.path && (
                      <motion.span
                        key={ripple.id}
                        aria-hidden="true"
                        className="absolute bg-white/20 rounded-full pointer-events-none"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 4,
                          height: 4,
                          marginLeft: -2,
                          marginTop: -2,
                        }}
                        initial="initial"
                        animate="animate"
                        variants={rippleVariants}
                      />
                    )}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
