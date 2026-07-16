"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CherryBlossoms() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = [];
    for (let i = 0; i < 50; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 15 + Math.random() * 15,
        size: 12 + Math.random() * 12,
        rotateSpeed: 0.5 + Math.random() * 1.5,
        swayAmount: 30 + Math.random() * 70,
        swaySpeed: 3 + Math.random() * 3,
      });
    }
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute will-change-transform"
          style={{
            left: `${petal.x}%`,
            top: -50,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [
              0,
              Math.sin(petal.id * 0.5) * petal.swayAmount,
              Math.cos(petal.id * 0.3) * -petal.swayAmount,
              Math.sin(petal.id * 0.7) * petal.swayAmount * 0.5,
              0,
            ],
            rotateX: [0, 180 * petal.rotateSpeed, 360 * petal.rotateSpeed],
            rotateZ: [0, 360 * petal.rotateSpeed, 720 * petal.rotateSpeed],
            opacity: [0, 0.9, 0.9, 0.9, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            className="overflow-visible drop-shadow-sm"
          >
            {/* Simple, clean cherry blossom petal shape */}
            <path
              d="M12 2C12 2 18 8 18 13C18 18 15.3 22 12 22C8.7 22 6 18 6 13C6 8 12 2 12 2Z"
              fill="#FFB7C5"
              opacity="0.9"
            />
            {/* Inner highlight */}
            <path
              d="M12 4C12 4 16 9 16 13C16 17 14 19 12 19"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
