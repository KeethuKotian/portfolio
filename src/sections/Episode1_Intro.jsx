"use client";

import { forwardRef, useEffect, useState } from "react";

const Episode1_Intro = forwardRef(({ introFinished, audioState }, ref) => {
  const { isPlaying, volume, togglePlay, handleVolumeChange } =
    audioState || {};

  const [indicator, setIndicator] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIndicator(false);
    }, 15000);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:p-24 z-10 w-full overflow-hidden transition-opacity duration-700 ${
        introFinished ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative z-10 max-w-4xl pt-16 sm:pt-20">
        <p className="text-anime-orange font-bold text-sm sm:text-base md:text-base tracking-widest mb-3 sm:mb-4">
          WELCOME TO MY DOMAIN
        </p>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-condensed font-bold uppercase text-white leading-none mb-3 sm:mb-4">
          KEERTHA<span className="text-anime-orange">N</span>
        </h1>
        <p className="text-anime-gray font-bold tracking-[0.2em] sm:tracking-[0.4em] text-sm sm:text-base md:text-base md:text-lg mb-8 sm:mb-12 md:mb-20">
          DEVELOPER &bull; CREATOR &bull; INNOVATOR
        </p>

        <div className="space-y-2 max-w-xs sm:max-w-md">
          <p className="text-anime-gray text-sm sm:text-base tracking-wide">
            Forging digital solutions with precision and power.
          </p>
          <p className="text-anime-gray text-sm sm:text-base tracking-wide">
            Every project is a battle won through code.
          </p>
        </div>

        {/* BGM SYSTEM HUD CONTROL CENTER */}
        {audioState && (
          <div className="mt-8 md:mt-12 ref-card p-4 sm:p-5 w-full max-w-[280px] sm:max-w-xs border border-anime-orange/20 bg-anime-charcoal/80 backdrop-blur-md relative overflow-hidden group hover:border-anime-orange/50 transition-all duration-300">
            {/* Neon glowing line overlay */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-anime-orange to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] tracking-wider text-anime-orange font-bold uppercase block">
                  SYSTEM BGM HUD
                </span>
                <span className="text-xs font-condensed font-bold text-white tracking-widest uppercase">
                  RESONANCE.MP3
                </span>
              </div>

              {/* Spectrum visualizer bars */}
              <div className="flex items-end gap-[3px] h-6 px-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[3px] bg-anime-orange rounded-full transition-all duration-300 ${
                      isPlaying ? "animate-bar-pulse" : "h-[3px]"
                    }`}
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      height: isPlaying ? "auto" : "3px",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Anime-themed Play Button */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-anime-orange/10 border border-anime-orange/40 text-anime-orange hover:bg-anime-orange hover:text-anime-black hover:border-anime-orange transition-all duration-300 shadow-md hover:shadow-anime-orange-glow active:scale-95 cursor-pointer"
              >
                {isPlaying ? (
                  <span className="text-sm sm:text-base">⏸</span>
                ) : (
                  <span className="text-sm sm:text-base translate-x-[1px]">
                    ▶
                  </span>
                )}
              </button>

              {/* Volume Slider HUD */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-anime-gray tracking-widest font-bold">
                    OUTPUT LEVEL
                  </span>
                  <span className="text-[10px] text-anime-orange font-bold">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) =>
                    handleVolumeChange(parseFloat(e.target.value))
                  }
                  className="w-full h-1 bg-anime-black rounded-lg appearance-none cursor-pointer accent-anime-orange border border-anime-gray/10 text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Sword canvas */}
      {/* Mobile: centered behind text */}

      {/* Scroll Indicator */}
      <div
        className={` ${indicator ? " " : "hidden"}   absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-all duration-1000`}
      >
        <span className="text-[11px] tracking-[0.35em] text-anime-orange uppercase font-bold animate-pulse">
          SCROLL DOWN
        </span>

        {/* Strong bouncing mouse */}
        <div className="w-6 h-10 border-2 border-anime-orange rounded-full flex items-start justify-center p-1 shadow-[0_0_15px_rgba(255,87,34,0.6)]">
          <div className="w-1.5 h-3 bg-anime-orange rounded-full animate-bounce"></div>
        </div>

        {/* Double bounce arrow */}
        <div className="text-anime-orange text-xl animate-bounce drop-shadow-[0_0_8px_rgba(255,87,34,0.8)]">
          ↓
        </div>
      </div>
    </section>
  );
});

Episode1_Intro.displayName = "Episode1_Intro";
export default Episode1_Intro;
