import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "./components/ThemeProvider";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AmbientBackground from "./components/AmbientBackground";
import RouteShutter from "./components/RouteShutter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

/**
 * Reset scroll position on navigation, instantly.
 *
 * index.css sets `scroll-behavior: smooth` for anchor links, which would also
 * make this programmatic jump animate the whole page on every route change.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
};

/**
 * The router base matches Vite's `base` so the same build works at a domain
 * root ("/") or under a sub-path such as a GitHub Pages project site
 * ("/portfolio/").
 */
const BASE_NAME = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

/**
 * Theme is applied as `data-theme` on <html> by ThemeProvider, so all five
 * design directions share one component tree and one bundle.
 *
 * ThemeSwitcher is the review control for choosing between them — remove it,
 * the ThemeProvider wrapper and src/lib/themes.ts once a direction is settled.
 */
const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" theme="dark" />
      <BrowserRouter basename={BASE_NAME}>
        <AmbientBackground />
        <CustomCursor />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>

        {/* Outside AnimatePresence so it persists across route changes. */}
        <Navbar />
        <RouteShutter />
        <AppRoutes />
        <ThemeSwitcher />
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
