
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// Force dark mode
const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    
    // Add custom scrollbar and other global styles
    document.body.classList.add('custom-scrollbar');
    
    // Add a class to show subtle scanlines effect
    document.body.classList.add('subtle-scanlines');
    
    // Set the body background to pure black and text to white
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
    
    return () => {
      document.body.classList.remove('custom-scrollbar');
      document.body.classList.remove('subtle-scanlines');
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

const queryClient = new QueryClient();

const App = () => {
  // Force dark mode on initial load
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" theme="dark" />
        <BrowserRouter>
          <CustomCursor />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
