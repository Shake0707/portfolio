"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "@/components/Camera";
import ParticlesBackground from "@/components/ParticlesBackground";
import TerminalText from "@/components/TerminalText";

export default function Home() {
  return (
    <Canvas
      id="main"
      style={{
        width: "100vw",
        height: "100vh",
      }}
      camera={{
        near: 0.1,
        far: 1000,
        zoom: 1,
        position: [1.5, 0.2, 0],
      }}
    >
      <Camera />
      <ambientLight intensity={1.5} />
      <OrbitControls />
      {/* PARTICLES */}
      <ParticlesBackground />
      {/* PARTICLES */}
      <Navigation position={[0.7, -0.7, -0.7]} scale={1} />
      {/* <TerminalText
        fullText="Hello world"
        position={[0.7, 0.7, 0.6]}
        typingSpeed={100}
      /> */}
      {/* <gridHelper args={[30, 30]} /> */}
      {/* <SpotLightWithHelper /> */}
      {/* <axesHelper args={[100]} /> */}
    </Canvas>
  );
}