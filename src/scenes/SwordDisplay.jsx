"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function FinalSwordMesh() {
  const { scene } = useGLTF("/models/sangetsu_draco.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
  const cloned = useMemo(() => scene.clone(true), [scene]);

  const modelRef = useRef();
  const lightRef = useRef();
  const auraLightsRef = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Main aura pulse
    if (lightRef.current) {
      const wave1 = Math.sin(time * 2.1) * 6;
      const wave2 = Math.sin(time * 5.3) * 4;
      const randomBurst = Math.random() > 0.97 ? 30 : 0;
      lightRef.current.intensity = 20 + wave1 + wave2 + randomBurst;
    }

    // Moving aura lights
    auraLightsRef.current.forEach((light, i) => {
      if (!light) return;
      const offset = (i / 4) * Math.PI * 2;
      const yPos = Math.sin(time * 1.8 + offset) * 3.5;
      const xPos = Math.sin(time * 3.2 + offset) * 0.4;
      const zPos = Math.cos(time * 2.5 + offset) * 0.4;
      light.position.set(xPos, yPos, zPos);

      const centerPulse = Math.pow(Math.cos(yPos * 0.5), 4) * 15;
      light.intensity = 5 + centerPulse + Math.sin(time * 8 + offset) * 5;
    });
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={modelRef}>
        <primitive
          object={cloned}
          scale={0.7}
          position={[0, -2, 0]}
          rotation={[0, Math.PI / 4, 0.1]}
        />
        
        {/* PARTICLES */}
        <Sparkles
          count={20}
          scale={[1, 7, 1]}
          size={3}
          speed={1.5}
          opacity={0.6}
          color="#ff33aa"
          noise={2}
        />

        {/* AURA LIGHTS */}
        {[...Array(4)].map((_, i) => (
          <pointLight
            key={i}
            ref={(el) => (auraLightsRef.current[i] = el)}
            color="#ff33aa"
            distance={8}
            intensity={0}
            decay={2}
          />
        ))}

        {/* MAIN LIGHT */}
        <pointLight
          ref={lightRef}
          color="#ff33aa"
          distance={60}
          intensity={25}
          position={[0, 1, 1]}
        />
      </group>
    </Float>
  );
}

export default function SwordDisplay() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 0);
      }}
    >
      <ambientLight intensity={0.3} />
      
      {/* RIM LIGHTS */}
      <spotLight
        position={[-10, 5, -3]}
        angle={0.5}
        penumbra={1}
        intensity={350}
        color="#ff00ff"
      />
      <spotLight
        position={[10, -5, -3]}
        angle={0.5}
        penumbra={1}
        intensity={350}
        color="#ff33aa"
      />
      <pointLight
        position={[0, 0, -4]}
        distance={15}
        intensity={150}
        color="#ff00ff"
      />

      {/* FRONT FILL */}
      <directionalLight
        position={[0, 0, 5]}
        intensity={1.5}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <FinalSwordMesh />
        <Environment preset="night" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}

useGLTF.preload("/models/sangetsu_draco.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");