"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Episode6_Final = forwardRef((props, ref) => {
  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:p-24 z-10 w-full overflow-hidden"
    >
      {/* Text content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start pb-6 sm:pb-12 mt-16 sm:mt-0">
        <p className="text-anime-orange font-bold text-sm sm:text-base md:text-base tracking-widest mb-2">
          FINAL EPISODE
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-condensed text-white mb-3 sm:mb-4 text-glow-orange">
          TO BE CONTINUED...
        </h2>
        <p className="text-anime-gray text-sm sm:text-base mb-6 sm:mb-12 max-w-sm sm:max-w-md">
          The journey doesn’t end here — it evolves. Let’s create the next
          chapter together.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() =>
              window.open("https://github.com/KeethuKotian", "_blank")
            }
            className="ref-card px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 hover:text-anime-orange flex-1 sm:flex-initial justify-center cursor-pointer"
          >
            <span className="text-base sm:text-xl">⌨️</span>
            <span className="text-sm sm:text-base md:text-base font-bold tracking-wider">
              GitHub
            </span>
          </button>
          <button
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/keerthan-kotian-458565305",
                "_blank",
              )
            }
            className="ref-card px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 hover:text-anime-orange flex-1 sm:flex-initial justify-center cursor-pointer"
          >
            <span className="text-base sm:text-xl">🔗</span>
            <span className="text-sm sm:text-base md:text-base font-bold tracking-wider">
              LinkedIn
            </span>
          </button>
          <button
            onClick={() =>
              (window.location.href = "mailto:keerthankotian05@gmail.com")
            }
            className="ref-card px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 hover:text-anime-orange flex-1 sm:flex-initial justify-center cursor-pointer"
          >
            <span className="text-base sm:text-xl">✉️</span>
            <span className="text-sm sm:text-base md:text-base font-bold tracking-wider">
              Email
            </span>
          </button>
          <button
            className="ref-card px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 hover:text-anime-orange border-anime-orange/50 flex-1 sm:flex-initial justify-center cursor-pointer"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Keerthan.pdf";
              link.download = "Keerthan-Resume.pdf";
              link.click();
            }}
          >
            <span className="text-anime-orange text-base sm:text-xl">📄</span>
            <span className="text-anime-orange text-sm sm:text-base md:text-base font-bold tracking-wider">
              Resume
            </span>
          </button>
        </div>
      </div>
    </section>
  );
});

Episode6_Final.displayName = "Episode6_Final";
export default Episode6_Final;
