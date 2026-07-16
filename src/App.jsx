import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar";
import CherryBlossoms from "./components/CherryBlossoms";
import AnimeIntroScene from "./scenes/AnimeIntroScene";
import SwordDisplay from "./scenes/SwordDisplay";

import Episode1_Intro from "./sections/Episode1_Intro";
import Episode2_About from "./sections/Episode2_About";
import Episode3_Skills from "./sections/Episode3_Skills";
import Episode4_Domain from "./sections/Episode4_Domain";
import Episode5_Projects from "./sections/Episode5_Projects";
import Episode6_Final from "./sections/Episode6_Final";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const timelineRef = useRef(null);
  const flashRef = useRef(null);

  const [introFinished, setIntroFinished] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Global Audio BGM state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/bgm_compressed.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn(
            "Autoplay blocked by browser policy. Play triggered by user interaction:",
            err,
          );
        });
    }
  }, [isPlaying]);

  const onIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const sectionRefs = useRef([]);
  const setSectionRef = (i) => (el) => (sectionRefs.current[i] = el);
  const bgRefs = useRef([]);
  const setBgRef = (i) => (el) => (bgRefs.current[i] = el);

  useGSAP(
    () => {
      const sections = sectionRefs.current.filter(Boolean);
      const bgs = bgRefs.current.filter(Boolean);
      if (!containerRef.current || sections.length === 0) return;

      const GAP = 1.5;
      const SCROLL_UNIT = window.innerHeight * 2.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "mainScroll",
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${SCROLL_UNIT * GAP * (sections.length - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollRef.current = self.progress;
          },
        },
      });

      timelineRef.current = tl;

      sections.forEach((section, i) => {
        gsap.set(section, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100vh",
          yPercent: i === 0 ? 0 : 100,
          opacity: 1,
          zIndex: i + 1,
          willChange: "transform, opacity",
        });
      });
      
      bgs.forEach((bg, i) => {
        gsap.set(bg, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100vh",
          yPercent: i === 0 ? 0 : 100,
          zIndex: i + 1,
          willChange: "transform",
        });
      });

      sections.forEach((section, i) => {
        if (i === 0) return;

        const start = i * GAP;

        tl.to(
          [section, bgs[i]],
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power2.out",
            onStart: () => setActiveSection(section.id),
            onReverseComplete: () => setActiveSection(sections[i - 1].id),
          },
          start,
        );

        tl.to(
          sections[i - 1],
          {
            yPercent: -30,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          start,
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
    const sections = sectionRefs.current;
    const target = sections.find((s) => s?.id === id);
    if (!target) return;
    gsap.to(window, {
      scrollTo: target,
      duration: 0,
    });
  }, []);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean);
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      {/* WHITE FLASH OVERLAY */}
      <div
        ref={flashRef}
        className="fixed inset-0 bg-white z-[90] pointer-events-none opacity-0"
      />

      {/* GLOBAL BACKGROUNDS LAYER (z-0) */}
      <div className={`fixed inset-0 z-0 transition-opacity duration-700 overflow-hidden ${introFinished ? "opacity-100" : "opacity-0"}`}>
        <div ref={setBgRef(0)} className="absolute inset-0 w-full h-screen">
          <img src="/background/bg1.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-anime-black via-anime-black/60 to-transparent md:block hidden"></div>
          <div className="absolute inset-0 bg-anime-black/80 md:hidden block"></div>
        </div>
        <div ref={setBgRef(1)} className="absolute inset-0 w-full h-screen">
          <img src="/background/bg2.webp" alt="Origin Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-anime-black/75"></div>
        </div>
        <div ref={setBgRef(2)} className="absolute inset-0 w-full h-screen">
          <img src="/background/bg3.webp" alt="Arsenal Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-anime-black/75 mix-blend-multiply"></div>
        </div>
        <div ref={setBgRef(3)} className="absolute inset-0 w-full h-screen">
          <img src="/background/bg4.jpeg" alt="Domain Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-anime-black/80"></div>
        </div>
        <div ref={setBgRef(4)} className="absolute inset-0 w-full h-screen">
          <img src="/background/bg2.webp" alt="Projects Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-anime-black via-anime-black/80 to-transparent"></div>
        </div>
        <div ref={setBgRef(5)} className="absolute inset-0 w-full h-screen">
          <img src="/background/bg4.jpeg" alt="Final Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-anime-black/60" />
        </div>
      </div>

      {/* STORY LAYER (z-20) */}
      <div
        ref={containerRef}
        className={`relative w-full h-screen z-[20] transition-opacity duration-700 ${
          introFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        <Episode1_Intro
          ref={setSectionRef(0)}
          introFinished={introFinished}
          audioState={{ isPlaying, volume, togglePlay, handleVolumeChange }}
        />
        <Episode2_About ref={setSectionRef(1)} />
        <Episode3_Skills ref={setSectionRef(2)} />
        <Episode4_Domain ref={setSectionRef(3)} />
        <Episode5_Projects ref={setSectionRef(4)} />
        <Episode6_Final ref={setSectionRef(5)} />
      </div>

      {/* 3D SCENE (INTRO) */}
      {!introFinished && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AnimeIntroScene
            scrollRef={scrollRef}
            onIntroComplete={onIntroComplete}
            flashRef={flashRef}
          />
        </div>
      )}

      {/* 3D SCENE (SWORD DISPLAY LOOP - ONLY AFTER INTRO) */}
      {introFinished && (
        <div className="fixed inset-0 z-[10] pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 lg:left-[75%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{
              maskImage:
                "radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 85%)",
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 85%)",
            }}
          >
            <SwordDisplay />
          </div>
        </div>
      )}

      {/* FLOATING MINI BGM CONTROLLER */}
      {introFinished && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-anime-charcoal/90 border border-anime-orange/20 rounded-full px-4 py-2 backdrop-blur-md shadow-lg shadow-black/80 hover:border-anime-orange/50 transition-all duration-300 group">
          <div className="flex items-end gap-[2px] h-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-[2px] bg-anime-orange rounded-full ${
                  isPlaying ? "animate-bar-pulse" : "h-[2px]"
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  height: isPlaying ? "auto" : "2px",
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-anime-orange/10 border border-anime-orange/30 text-white hover:bg-anime-orange hover:text-anime-black hover:border-anime-orange transition-all duration-300 text-xs active:scale-95 cursor-pointer"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="w-0 overflow-hidden group-hover:w-16 transition-all duration-300 flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-14 h-1 bg-anime-black rounded-lg appearance-none cursor-pointer accent-anime-orange text-xs"
            />
          </div>
        </div>
      )}

      {/* UI */}
      <div
        className={`relative z-[80] transition-all duration-700 ${
          introFinished
            ? "opacity-100"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
        <CherryBlossoms />
      </div>
    </main>
  );
}
