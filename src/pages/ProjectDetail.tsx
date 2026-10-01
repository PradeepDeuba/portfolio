import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import NotFound from "./NotFound";
import { getProjectById, projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id);

  if (!project) {
    return <NotFound />;
  }

  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);

  return (
    <PageTransition>
      <main className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-video mb-10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              {project.description}
            </p>

            {project.overview && project.overview.length > 0 && (
              <div className="space-y-4 mb-10">
                {project.overview.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Github size={16} /> View Source
                </a>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                Discuss a project <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-24">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item, index) => (
                <ProjectCard key={item.id} project={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
};

export default ProjectDetail;
