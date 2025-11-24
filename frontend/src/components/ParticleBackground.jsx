// src/components/ParticleBackground.jsx
import React, { memo } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesConfig from "../components/particles-config";

const ParticlesBackground = memo(function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
});

export default ParticlesBackground;