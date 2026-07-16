"use client";

import { Sparkles } from "@react-three/drei";

export default function BackgroundParticles() {
  return (
    <group>
      {/* Pink Sakura-like petals */}
      <Sparkles
        count={200}
        scale={15}
        size={4}
        speed={0.2}
        opacity={0.8}
        color="#ffb7c5" // Cherry blossom pink
        noise={1}
      />
      
      {/* Dark magical energy/dust */}
      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.5}
        opacity={0.4}
        color="#8b0000" // Dark red
      />
    </group>
  );
}
