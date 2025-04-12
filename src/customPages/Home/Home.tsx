"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import Camera from "@/components/Camera";
import ParticlesBackground from "@/components/ParticlesBackground";
import { TV } from "@/constants/tv";
import { TvText } from "@/constants/tvText";
import LockedTypingTerminal from "@/components/Navigation/TEXT/LockedTypingTerminal";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import LoadingComponent from "../Loading/Loading";
import Plane from "@/components/ToggleMainCamera/Plane/Plane";
import { useState } from "react";

// TODO: camera tvga yaqin bo'lganda tv dan tashqari bosilgan hamma joyda camera orqaga qaytsin
// TODO B plan: camerani yoniga to'rtburchak qo'yish va shuni bosiladigan qilish
export default function Home() {
    const { progress, total } = useProgress();
    const [isFreeCamera, setIsFreeCamera] = useState<boolean>(false);
    const [enabledControls, setEnabledControls] = useState<boolean>(false);

    function zoomOut() {
        setIsFreeCamera(true);
        document.body.style.cursor = "default";
    }

    function zoomIn() {
        setIsFreeCamera(false);
    }

    return (
        <>
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
                    position: [10.5, 7, 4],
                    // position: [15, 10, 10],
                }}
            >
                <Camera isFreeCamera={isFreeCamera} setEnabledControls={setEnabledControls} />
                <ambientLight intensity={3} />
                <OrbitControls
                    maxDistance={50}
                    minDistance={20}
                    rotateSpeed={0.5}
                    zoomSpeed={0.6}
                    enabled={enabledControls}
                />
                <ParticlesBackground />
                {
                    isFreeCamera ? "" :
                        <Plane
                            props={{
                                position: [0, 6, 19],
                                rotation: [0, Math.PI / 2, 0],
                                onClick: zoomOut
                            }}
                            message="Zoom out"
                        />
                }

                {
                    isFreeCamera ?
                        <Plane
                            props={{
                                position: [1, 6, 4],
                                rotation: [0, Math.PI / 2, 0],
                                onClick: zoomIn
                            }}
                            width={16}
                            height={13}
                            message="Zoom in"
                        /> : ""
                }

                <Provider store={store}>
                    <Navigation
                        position={[TV.pos.x, TV.pos.y, TV.pos.z]}
                        scale={TV.scale}
                    />
                    <group
                        position={[TvText.pos.x, TvText.pos.y, TvText.pos.z]}
                    >
                        <LockedTypingTerminal />
                    </group>
                </Provider>
                {
                    isFreeCamera ? "" :
                        <Plane

                            props={{
                                position: [0, 6, -11],
                                rotation: [0, Math.PI / 2, 0],
                                onClick: zoomOut
                            }}
                            message="Zoom out"
                        />
                }
                {/* <gridHelper args={[30, 30]} />
                <axesHelper args={[100]} /> */}
            </Canvas>
            {/* <ToggleMainCamer /> */}
            <LoadingComponent isCanvasLoader={true} progress={progress} total={total} />
        </>
    );
}