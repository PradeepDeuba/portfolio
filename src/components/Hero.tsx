
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen relative flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-20">
          <div className="lg:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-block mb-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Innovative Solutions
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-balance mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Crafting Digital Experiences with Precision and Purpose
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Building cutting-edge software solutions that combine elegant design with powerful functionality. Transform your ideas into reality with our expertise in modern technology.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block lg:w-5/12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-card border border-border rounded-2xl shadow-xl glass overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-6 bg-muted flex items-center px-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pt-8 px-4 pb-4">
                  <div className="w-full aspect-video bg-muted rounded-md"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
