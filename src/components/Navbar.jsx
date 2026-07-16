"use client";

import React, { useState } from "react";

export default function Navbar({ activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "hero", label: "START" },
    { id: "origin", label: "ORIGIN" },
    { id: "arsenal", label: "ARSENAL" },
    { id: "domain", label: "DOMAIN" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" }
  ];

  const scrollToSection = (id) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 sm:px-8 py-4 sm:py-6 flex justify-between items-center mix-blend-difference text-white">
        <div 
          className="flex items-center gap-2 cursor-pointer font-bold tracking-widest text-lg sm:text-xl"
          onClick={() => {
            scrollToSection("hero");
            setIsOpen(false);
          }}
        >
          <span className="text-anime-orange text-xl sm:text-2xl">🗡️</span>
         K. Kotian
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative pb-1 transition-colors duration-300 cursor-pointer ${
                activeSection === link.id ? "text-anime-orange" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-anime-orange rounded-full shadow-[0_0_10px_rgba(255,87,34,0.8)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden focus:outline-none z-[110] relative w-6 h-5 flex flex-col justify-between items-center group cursor-pointer"
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 transform origin-left ${isOpen ? "rotate-45 translate-x-[3px] translate-y-[-1px]" : ""}`}></span>
          <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 transform origin-left ${isOpen ? "-rotate-45 translate-x-[3px] translate-y-[1px]" : ""}`}></span>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <div 
        className={`fixed inset-0 h-screen w-screen bg-white/10 backdrop-blur-xl border border-anime-orange/20 z-[90] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
        }`}
      >
        {/* Decorative Grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,87,34,0.15)_1px,transparent_1px)] [background-size:20px_20px] opacity-100 pointer-events-none"></div>
        
        {navLinks.map((link, idx) => (
          <button
            key={link.id}
            onClick={() => {
              scrollToSection(link.id);
              setIsOpen(false);
            }}
            className={`text-2xl font-condensed tracking-widest transition-all duration-300 relative py-2 block cursor-pointer ${
              activeSection === link.id 
                ? "text-anime-orange scale-110 font-bold" 
                : "text-white/80 hover:text-white"
            }`}
            style={{ 
              transitionDelay: isOpen ? `${idx * 60}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0
            }}
          >
            <span className="text-xs text-anime-orange/50 mr-2 font-mono">0{idx + 1}.</span>
            {link.label}
            {activeSection === link.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-anime-orange rounded-full shadow-[0_0_10px_rgba(255,87,34,0.8)]"></span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
