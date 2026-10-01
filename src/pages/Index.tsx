
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Globe, Lightbulb, Zap } from "lucide-react";
import PageTransition from "../components/PageTransition";
import ParticleBackground from "../components/ParticleBackground";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects } from "@/data/projects";

const services = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Custom Software Development",
    description: "Building tailored software solutions to address your specific business challenges and requirements."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Web Application Development",
    description: "Creating responsive, intuitive web applications that provide seamless user experiences across devices."
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI & Machine Learning",
    description: "Implementing intelligent algorithms and data models to unlock insights and automate complex processes."
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "UX/UI Design",
    description: "Designing user-centered interfaces that balance aesthetics with functionality for optimal user satisfaction."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Optimization",
    description: "Enhancing application speed, responsiveness, and efficiency through careful optimization techniques."
  }
];

const Index = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <PageTransition>
      <ParticleBackground />
      
      <main className="relative">
        <Hero />

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="py-20 md:py-32 bg-secondary/50 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="reveal-section">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                  Services
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Innovative Solutions for Modern Challenges
                </h2>
                <p className="text-muted-foreground text-lg">
                  We provide end-to-end development services that help transform your ideas into powerful, scalable solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-5">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          className="py-20 md:py-32 relative"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="reveal-section">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                <div className="md:max-w-2xl">
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                    Projects
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Featured Work
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Explore our recent projects showcasing our expertise and innovative approaches to solving complex problems.
                  </p>
                </div>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 mt-6 md:mt-0 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  View All Projects <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-500/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl px-6 py-14 md:p-14 glass-dark"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Whether you have a specific project in mind or just want to explore possibilities, we're here to help bring your ideas to life.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Start a Conversation <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
