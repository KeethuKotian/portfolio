"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Episode2_About = forwardRef((props, ref) => {
  const principles = [
    { title: "Build code that lasts beyond today", icon: "⏳" },
    { title: "Treat every challenge as a level-up opportunity", icon: "⚔️" },
    { title: "Commit to continuous learning and evolution", icon: "🧬" },
    { title: "Engineer solutions with clarity and purpose", icon: "🎯" },
  ];

  return (
    <section
      id="origin"
      ref={ref}
      className="relative min-h-screen flex items-center px-6 sm:px-12 md:p-24 z-10 w-full overflow-hidden"
    >
      <div className="relative z-60 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-start mt-16 sm:mt-12">
        {/* Left Side: Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 space-y-4 sm:space-y-6"
        >
          <div>
            <p className="text-anime-orange font-bold text-sm sm:text-base md:text-base tracking-widest mb-2">
              EPISODE 01
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-condensed text-white mb-2 text-glow-orange">
              ORIGIN
            </h2>
            <p className="text-anime-gray text-sm sm:text-base tracking-wide border-b border-white/10 pb-3 inline-block">
              The Beginning of the Journey
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 text-anime-gray text-sm md:text-base leading-relaxed max-w-md pt-2 sm:pt-4">
            <p>
              Like Ichigo discovering his Soul Reaper abilities, my journey into
              development started with curiosity and quickly turned into a
              commitment to building real, impactful software.
            </p>

            <p>
              I focus on writing clean, scalable code and improving with every
              project I work on.
            </p>

            <p>
              I believe in continuous learning, solving meaningful problems, and
              turning ideas into reliable digital solutions through consistent
              effort and discipline.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Core Principles */}
        <div className="w-full md:w-1/2 flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="ref-card p-5 sm:p-8 max-w-md w-full"
          >
            <h3 className="text-anime-orange font-bold text-sm sm:text-base tracking-widest mb-4 sm:mb-6">
              CORE PRINCIPLES
            </h3>
            <ul className="space-y-4 sm:space-y-6">
              {principles.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <span className="text-anime-orange text-base sm:text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                    {p.icon}
                  </span>
                  <span className="text-anime-gray text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors">
                    {p.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Episode2_About.displayName = "Episode2_About";
export default Episode2_About;
