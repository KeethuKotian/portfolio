"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Episode5_Projects = forwardRef((props, ref) => {
  const projects = [
    {
      title: "NOTICEHUB",
      desc: "A modern, comprehensive digital Notice Board built for educational institutions to streamline communication, featuring role-based access control, departmental targeting, and real-time announcements.",
      tags: ["Next.js", "Tailwind CSS", "Prisma", "MySQL", "Redux", "JWT"],
      link: "https://github.com/KeethuKotian/NoticeHub.git",
    },
    {
      title: "AURAFIT",
      desc: "A next-generation ML fitness & nutrition dashboard. Uses custom Machine Learning models to dynamically predict goal probability, forecast time-to-goal, and auto-generate personalized workout routines.",
      tags: ["Next.js", "Tailwind CSS", "FastAPI", "Python", "Scikit-Learn"],
      link: "https://github.com/KeethuKotian/AuraFit.git",
    },
    {
      title: "FREELANCE CLIENT WEBSITE",
      desc: "Full-stack business website developed for a real construction engineering client with a modern responsive UI, secure backend APIs, authentication, media management, and scalable architecture.",
      tags: [
        "React",
        "Spring Boot",
        "JWT",
        "ShadCN UI",
        "Cloudinary",
        "REST APIs",
      ],
      link: "https://anuvengineers.com/",
    },
    {
      title: "PROJECT MANAGEMENT SYSTEM",
      desc: "A modern task and project management application with authentication, real-time updates, and a clean UI built using ShadCN components.",
      tags: ["React", "Spring Boot", "JWT", "ShadCN UI", "REST APIs"],
      link: "https://github.com/KeethuKotian/Project-Management-System.git",
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:p-24 z-10 w-full overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 mt-16 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-anime-orange font-bold text-sm sm:text-base md:text-base tracking-widest mb-2">
            EPISODE 04
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-condensed text-white mb-2 text-glow-orange">
            PROJECTS
          </h2>
          <p className="text-anime-gray text-sm sm:text-base tracking-widest italic border-b border-white/5 pb-2 inline-block">
            Battles Fought & Won
          </p>
        </motion.div>

        {/* Mobile/Tablet Vertical Snapping Slider */}
        <div className="flex md:hidden flex-col overflow-y-auto snap-y snap-mandatory gap-5 h-[48vh] max-h-[360px] scrollbar-none w-full py-[70px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.5, scale: 0.92, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => window.open(project.link, "_blank")}
              className="ref-card p-5 group flex flex-col justify-between min-h-[240px] snap-center flex-shrink-0 cursor-pointer border border-anime-orange/20 bg-anime-charcoal/90 backdrop-blur-sm hover:border-anime-orange/50 transition-all"
            >
              <div>
                <h3 className="text-anime-orange font-bold text-xl mb-3 group-hover:text-glow-orange transition-all">
                  {project.title}
                </h3>
                <p className="text-anime-gray text-sm leading-relaxed md:text-base mb-3 line-clamp-3">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-3 py-1 rounded border border-anime-orange/25 text-anime-orange/80 group-hover:border-anime-orange transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              onClick={() => window.open(project.link, "_blank")}
              className="ref-card p-5 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <h3 className="text-anime-orange font-bold text-xl mb-3 group-hover:text-glow-orange transition-all">
                  {project.title}
                </h3>
                <p className="text-anime-gray text-sm leading-relaxed md:text-base mb-6 line-clamp-4">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-3 py-1.5 rounded border border-anime-orange/30 text-anime-orange/80 group-hover:border-anime-orange group-hover:text-anime-orange transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Episode5_Projects.displayName = "Episode5_Projects";
export default Episode5_Projects;
