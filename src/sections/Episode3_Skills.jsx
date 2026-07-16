"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

const Episode3_Skills = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      title: "FRONTEND",
      icon: "</>",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
      ],
    },
    {
      title: "BACKEND",
      icon: "⚡",
      skills: [
        "Spring Boot",
        "Node.js",
        "REST APIs",
        "WebSockets",
        "JWT Authentication",
      ],
    },
    {
      title: "DATA CORE",
      icon: "🧠",
      skills: ["MongoDB", "Redis", "MySQL"],
    },
  ];

  return (
    <section
      id="arsenal"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:p-24 z-10 w-full overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 sm:space-y-12 mt-16 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-anime-orange font-bold text-sm sm:text-base md:text-base tracking-widest mb-2">
            EPISODE 02
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-condensed text-white mb-2 text-glow-orange">
            ARSENAL
          </h2>
          <p className="text-anime-gray text-sm sm:text-base tracking-widest italic border-b border-white/10 pb-3 inline-block">
            The Tools of Power
          </p>
        </motion.div>

        {/* Responsive Tabs Control for Mobile/Tablet */}
        <div className="flex md:hidden border-b border-white/10 gap-1 mb-4">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-3 text-center text-xs tracking-widest font-condensed font-bold transition-all relative cursor-pointer ${
                activeTab === idx
                  ? "text-anime-orange scale-105"
                  : "text-anime-gray hover:text-white"
              }`}
            >
              {category.title}
              {activeTab === idx && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-anime-orange rounded-full shadow-[0_0_10px_rgba(255,87,34,0.8)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile View: Render Active Tab Card */}
        <div className="block md:hidden">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="ref-card p-6 min-h-[220px] flex flex-col justify-center"
          >
            <div className="text-anime-orange text-3xl mb-3 text-glow-orange opacity-90">
              {categories[activeTab].icon}
            </div>
            <h3 className="text-anime-orange font-bold text-xs tracking-widest mb-4 border-b border-white/5 pb-2">
              {categories[activeTab].title}
            </h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {categories[activeTab].skills.map((skill, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 bg-anime-orange rounded-full shadow-[0_0_5px_rgba(255,87,34,0.8)] flex-shrink-0"></span>
                  <span className="text-anime-gray text-sm sm:text-base">
                    {skill}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Desktop View: Render All Cards Side-by-Side */}
        <div className="hidden md:flex flex-col md:flex-row gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="ref-card p-8 flex-1"
            >
              <div className="text-anime-orange text-3xl mb-4 text-glow-orange opacity-90">
                {category.icon}
              </div>
              <h3 className="text-anime-orange font-bold text-sm tracking-widest mb-6 border-b border-white/5 pb-4">
                {category.title}
              </h3>

              <ul className="space-y-4">
                {category.skills.map((skill, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1 bg-anime-orange rounded-full shadow-[0_0_5px_rgba(255,87,34,0.8)]"></span>
                    <span className="text-anime-gray text-sm md:text-base">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Episode3_Skills.displayName = "Episode3_Skills";
export default Episode3_Skills;
