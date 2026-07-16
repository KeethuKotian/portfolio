"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Episode4_Domain = forwardRef((props, ref) => {
  const techniques = [
    {
      title: "FULL-STACK DEVELOPMENT",
      desc: "Developing end-to-end applications, from database design to responsive frontend interfaces using modern frameworks.",
      level: "92%",
    },
    {
      title: "UI/UX DESIGN",
      desc: "Designing clean, intuitive interfaces focused on usability, accessibility, and user experience.",
      level: "84%",
    },
    {
      title: "SYSTEM ARCHITECTURE",
      desc: "Structuring scalable and maintainable systems for real-world applications with solid backend design principles.",
      level: "83%",
    },
    {
      title: "PERFORMANCE OPTIMIZATION",
      desc: "Improving application speed, responsiveness, and efficient resource usage across frontend and backend.",
      level: "82%",
    },
  ];

  return (
    <section
      id="domain"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:p-24 z-10 w-full overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 mt-16 sm:mt-0">
        {/* Left Side: Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/3 mb-2 md:mb-0"
        >
          <p className="text-anime-orange font-bold text-sm sm:text-base md:text-base tracking-widest mb-2">
            EPISODE 03
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-condensed text-white mb-2 md:mb-6 text-glow-orange">
            DOMAIN
          </h2>
          <p className="text-anime-gray text-sm sm:text-base tracking-wide border-b border-white/10 pb-2 sm:pb-4 inline-block">
            Mastered Techniques
          </p>
        </motion.div>

        {/* Right Side: Grid of Progress Cards */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {techniques.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="ref-card p-4 sm:p-6 flex flex-col justify-between min-h-[140px] sm:min-h-[160px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <span className="text-anime-orange text-sm sm:text-base">
                    🔥
                  </span>
                  <h3 className="text-anime-orange font-bold text-sm sm:text-base tracking-wider">
                    {tech.title}
                  </h3>
                </div>
                <p className="text-anime-gray text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {tech.desc}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-anime-gray text-[11px] sm:text-xs tracking-widest uppercase">
                    Mastery Level
                  </span>
                  <span className="text-anime-orange font-bold text-xs">
                    {tech.level}
                  </span>
                </div>
                <div className="ref-progress-track">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: tech.level }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + index * 0.2,
                      ease: "circOut",
                    }}
                    viewport={{ once: true }}
                    className="ref-progress-fill"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Episode4_Domain.displayName = "Episode4_Domain";
export default Episode4_Domain;
