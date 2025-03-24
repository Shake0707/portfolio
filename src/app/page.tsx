"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "@/components/Camera";
import ParticlesBackground from "@/components/ParticlesBackground";
import { TV } from "@/constants/tv";
import { TvText } from "@/constants/tvText";
import LockedTypingTerminal from "@/components/Navigation/TEXT/LockedTypingTerminal";
import { Provider } from "react-redux";
import { store } from "@/store/store";

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
        position: [12, 15, 10],
      }}
    >
      <Camera />
      <ambientLight intensity={2} />
      <OrbitControls
        maxDistance={50}
        minDistance={20}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />
      {/* PARTICLES */}
      < ParticlesBackground />
      {/* PARTICLES */}
      <Provider store={store}>

        < Navigation
          position={[TV.pos.x, TV.pos.y, TV.pos.z]}
          scale={TV.scale}
        />
        <group
          position={[TvText.pos.x, TvText.pos.y, TvText.pos.z]}
        >
          <LockedTypingTerminal />
        </group>
      </Provider>
      {/* <gridHelper args={[30, 30]} /> */}
      {/* <axesHelper args={[100]} /> */}
    </Canvas>
  );
}