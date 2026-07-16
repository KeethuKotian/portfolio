"use client";

import { useGLTF, Sparkles } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

export default function SwordModel({
  introFinished,
  onIntroComplete,
  flashRef,
  contentRef,
}) {
  const { scene } = useGLTF("/models/sangetsu_draco.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

  const modelRef = useRef();
  const floatRef = useRef();
  const lightRef = useRef();
  const auraLightsRef = useRef([]);
  const glintRef = useRef();

  const isIntroFinished = useRef(false);

  useEffect(() => {
    if (!modelRef.current || !lightRef.current) return;

    // Disable scrolling during intro
    document.body.style.overflow = "hidden";

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024;

    const targetX = isMobile ? 0 : (isTablet ? 1.8 : 3.5);
    const targetY = isMobile ? -2.2 : 0;
    const targetZ = isMobile ? -5.5 : -2;
    const targetScale = isMobile ? 0.45 : (isTablet ? 0.75 : 1);

    const tl = gsap.timeline({
      onComplete: () => {
        isIntroFinished.current = true;

        // Re-enable scrolling
        document.body.style.overflow = "auto";

        if (onIntroComplete) onIntroComplete();
      },
    });

    // INITIAL STATE
    gsap.set(modelRef.current.position, {
      x: 0,
      y: 0,
      z: -18,
    });

    gsap.set(modelRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
    });

    gsap.set(modelRef.current.scale, {
      x: isMobile ? 0.45 : 0.8,
      y: isMobile ? 0.45 : 0.8,
      z: isMobile ? 0.45 : 0.8,
    });

    gsap.set(lightRef.current, {
      intensity: 5,
    });

    if (glintRef.current) {
      gsap.set(glintRef.current, {
        intensity: 0,
      });
    }

    // Hide main content initially
    if (contentRef?.current) {
      gsap.set(contentRef.current, {
        opacity: 0,
      });
    }

    // Hide flash initially
    if (flashRef?.current) {
      gsap.set(flashRef.current, {
        opacity: 0,
      });
    }

    // CINEMATIC INTRO
    tl.to(
      modelRef.current.position,
      {
        z: isMobile ? -1 : 2,
        duration: 2,
        ease: "power4.in",
      },
      0
    )

      // Sword enlarges toward camera
      .to(
        modelRef.current.scale,
        {
          x: isMobile ? 1.0 : 2,
          y: isMobile ? 1.0 : 2,
          z: isMobile ? 1.0 : 2,
          duration: 2,
          ease: "power4.in",
        },
        0
      )

      // Aura explosion (gentle pink aura to avoid glare lines on screen)
      .to(
        lightRef.current,
        {
          intensity: 45,
          duration: 1.8,
          ease: "power4.out",
        },
        0
      );

    // WHITE FLASH (Sudden Light Splash overlay on screen)
    if (flashRef?.current) {
      tl.to(
        flashRef.current,
        {
          opacity: 1,
          duration: 0.12,
          ease: "power4.out",
        },
        1.9
      );

      tl.to(
        flashRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        2.02
      );
    }

    // Sudden White Light Splash on the sword itself
    if (glintRef.current) {
      tl.to(
        glintRef.current,
        {
          intensity: 220,
          duration: 0.1,
          ease: "power4.out",
        },
        1.9
      );

      tl.to(
        glintRef.current,
        {
          intensity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        2.0
      );
    }

    // REVEAL WEBSITE CONTENT
    if (contentRef?.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        2.05
      );
    }

    // Move sword to final hero position
    tl.to(
      modelRef.current.position,
      {
        x: targetX,
        y: targetY,
        z: targetZ,
        duration: 1.5,
        ease: "power3.out",
      },
      2.1
    )

      // Return sword scale
      .to(
        modelRef.current.scale,
        {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 1.5,
          ease: "power3.out",
        },
        2.1
      )

      // Final cinematic angle
      .to(
        modelRef.current.rotation,
        {
          y: Math.PI / 4,
          duration: 1.5,
          ease: "power3.out",
        },
        2.1
      );
  }, [onIntroComplete, flashRef, contentRef]);

  useFrame((state) => {
    if (!modelRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    if (floatRef.current) {
      floatRef.current.position.y =
        Math.sin(time * 0.5) * 0.15;

      floatRef.current.rotation.z =
        Math.sin(time * 0.3) * 0.05;
    }

    // Idle sword movement after intro
    if (isIntroFinished.current) {
      modelRef.current.rotation.y =
        Math.PI / 4 + Math.sin(time * 0.2) * 0.1;
    }

    // Main aura pulse
    if (lightRef.current && isIntroFinished.current) {
      const wave1 = Math.sin(time * 2.1) * 6;
      const wave2 = Math.sin(time * 5.3) * 4;
      const randomBurst =
        Math.random() > 0.97 ? 30 : 0;

      lightRef.current.intensity =
        20 + wave1 + wave2 + randomBurst;
    }

    // Moving aura lights
    auraLightsRef.current.forEach((light, i) => {
      if (!light) return;

      const offset = (i / 4) * Math.PI * 2;

      const yPos =
        Math.sin(time * 1.8 + offset) * 3.5;

      const xPos =
        Math.sin(time * 3.2 + offset) * 0.4;

      const zPos =
        Math.cos(time * 2.5 + offset) * 0.4;

      light.position.set(xPos, yPos, zPos);

      const centerPulse =
        Math.pow(Math.cos(yPos * 0.5), 4) * 15;

      light.intensity = isIntroFinished.current
        ? 5 +
          centerPulse +
          Math.sin(time * 8 + offset) * 5
        : 0;
    });

    // Blade glint
    if (glintRef.current && isIntroFinished.current) {
      glintRef.current.intensity =
        Math.random() > 0.98 ? 180 : 0;

      glintRef.current.position.y =
        Math.sin(time * 5) * 3 - 1.5;
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      {/* FLOATING GROUP */}
      <group ref={floatRef}>
        {/* SWORD */}
        <primitive
          object={scene}
          scale={0.7}
          position={[0, -2, 0]}
          rotation={[0, -0.2, 0.1]}
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
      </group>

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
        distance={20}
        intensity={25}
        position={[0, 1, 1]}
      />

      {/* EXTRA LIGHTS */}
      <pointLight
        color="#ff00ff"
        distance={15}
        intensity={10}
        position={[0, -2, -1]}
      />

      <pointLight
        ref={glintRef}
        color="#ffffff"
        distance={5}
        intensity={0}
        position={[0.5, 0, 1]}
      />

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
    </group>
  );
}

useGLTF.preload("/models/sangetsu_draco.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");