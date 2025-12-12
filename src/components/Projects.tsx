import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  stack: string[];
  caseStudy: {
    challenge: string;
    approach: string;
    result: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'MERN Advanced Authentication',
    shortDescription: 'Secure authentication with signup/login, JWT authorization, protected routes, and hashed credentials.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    caseStudy: {
      challenge: 'Build a secure, scalable authentication workflow that handles user registration, login, and session management.',
      approach: 'Implemented JWT access/refresh token flow, bcrypt password hashing, route guards, and role-based access control.',
      result: 'Robust authentication system suitable for production full-stack applications with secure credential handling.',
    },
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    shortDescription: 'Responsive storefront with product listing, search, cart, and checkout flow.',
    stack: ['React', 'Bootstrap', 'REST API'],
    caseStudy: {
      challenge: 'Create a complete e-commerce experience with product browsing, filtering, and shopping cart functionality.',
      approach: 'Built responsive UI with product cards, implemented cart state management, and created a streamlined checkout process.',
      result: 'Clean, mobile-friendly e-commerce platform with intuitive user experience and smooth interactions.',
    },
  },
  {
    id: 3,
    title: 'Team Task Management System',
    shortDescription: 'Role-based task management system with JWT authentication, activity logs, and task progress tracking.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    caseStudy: {
      challenge:'Create a centralized platform for teams where admins can manage tasks and users can update progress, with secure authentication and real-time tracking.',
      approach: 'Developed a MERN-based application implementing role-based access controls. Admins can create, assign, and monitor tasks, while users can update status and add progress logs. Integrated JWT authentication for secure login, real-time task updates, and an activity log system for transparency.',
      result:  'A streamlined task management system that improves team collaboration, enhances workflow visibility, and ensures secure access to task operations.',
    },
  },
  {
    id: 4,
    title: 'Student Support Portal',
    shortDescription: 'Unified login system for students and admins with attendance & assignment management.',
    stack: ['React', 'Spring Boot', 'MySQL'],
    caseStudy: {
      challenge: 'Build a unified platform for students and administrators with role-based access and different dashboards.',
      approach: 'Created single login logic with role-based redirects, admin dashboard for assignments, and student dashboard for tracking.',
      result: 'Comprehensive portal streamlining communication between students and staff with efficient data management.',
    },
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative glass rounded-2xl p-6 hover:bg-card/90 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-primary font-medium text-sm">
                  View Case Study
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-display font-bold">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    Challenge
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    Approach
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.caseStudy.approach}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    Result
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.caseStudy.result}
                  </p>
                </div>
              </div>

              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
