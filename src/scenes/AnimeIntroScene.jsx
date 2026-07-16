"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SwordModel from "./SwordModel";

export default function AnimeIntroScene({
  scrollRef,
  onIntroComplete,
  flashRef,
}) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1);
        }}
      >
        {/* FOG (KEEP SAFE) */}
        <fog attach="fog" args={["#000000", 8, 30]} />

        {/* LIGHTING (STABLE BASE) */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          color="#ff00ff"
        />

        {/* SWORD (NO REMOUNT ZONE) */}
        <Suspense
          fallback={
            <Html center>
              <div className="text-zinc-400 text-sm tracking-widest">
                AWAKENING ZANPAKUTO...
              </div>
            </Html>
          }
        >
          <SwordModel
            scrollRef={scrollRef}
            onIntroComplete={onIntroComplete}
            flashRef={flashRef}
          />

          {/* MOVE ENVIRONMENT OUTSIDE EFFECT CHAIN */}
          <Environment preset="night" />
        </Suspense>

        {/* BLOOM (STABLE CONFIG) */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}