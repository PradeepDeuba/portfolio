import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
 * Setting it to `auto` for the duration of the call keeps the reset immediate.
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
 * ("/portfolio/"). BASE_URL always has a trailing slash; react-router wants it
 * without, hence the strip.
 */
const BASE_NAME = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      {/* Navbar is mounted once, in App — see the note there. Rendering it here
          as well produced two identical navigation landmarks, two scroll
          listeners and two aria-current markers for the active route. */}
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
 * Dark mode is declared once as `class="dark"` on <html> in index.html, so no
 * effect here writes to documentElement or body.
 *
 * QueryClientProvider has been removed: @tanstack/react-query was mounted around
 * the app but no component ever called useQuery, useMutation or useQueryClient,
 * so it was pure bundle weight.
 */
const App = () => (
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

      {/* Mounted here rather than inside AppRoutes so it sits outside
          AnimatePresence and therefore does not re-animate on every route
          change — it persists while the page content cross-fades. */}
      <Navbar />
      <RouteShutter />
      <AppRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
