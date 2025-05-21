"use client";

import { Navigation } from "@/components/3D/Navigation/Navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import Camera from "@/components/Camera";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { TV } from "@/constants/tv";
import { TvText } from "@/constants/tvText";
import LockedTypingTerminal from "@/components/3D/Navigation/TEXT/LockedTypingTerminal";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import LoadingComponent from "../Loading/Loading";
import Plane from "@/components/ToggleMainCamera/Plane/Plane";
import { useState } from "react";
import CameraChange from "@/components/Camera/CamerChange/CameraChange";
import classes from "./style.module.css";

interface IProps {
    deviceType: "mobile" | "desktop";
}

export default function Home({ deviceType }: IProps) {
    const { progress, total } = useProgress();
    const [enabledControls, setEnabledControls] = useState<boolean>(false);
    const [isZoomOut, setIsZoomOut] = useState<boolean>(true);
    const [isStartAnim, setIsStartAnim] = useState(true);
    const [isShowZoomChanger, setIsShowZoomChanger] = useState<boolean>(false);

    function zoomOut() {
        setIsStartAnim(true);
        setIsZoomOut(true);
        document.body.style.cursor = "default";
    }

    function zoomIn() {
        setIsStartAnim(true);
        setEnabledControls(false);
        setIsZoomOut(false);
    }

    if (deviceType === "mobile") {
        return (
            <div className={classes.container}>
                <h1>Bu sayt sizni qurulmangiz uchun emas 😊</h1>
                <h3>Iltimos kompyuter orqali kiring</h3>
            </div>
        )
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
                    // position: [10.5, 7, 4],
                    position: [30, 20, 10],
                }}
            >
                <ambientLight intensity={3} />
                <Camera />
                <CameraChange
                    isZoomOut={isZoomOut}
                    setEnableControls={setEnabledControls}
                    isStartAnim={isStartAnim}
                    setIsStartAnim={setIsStartAnim}
                    startProgress={progress}
                    setIsZoomOut={setIsZoomOut}
                    setIsShowZoomChanger={setIsShowZoomChanger}
                />
                <OrbitControls
                    maxDistance={45}
                    minDistance={20}
                    rotateSpeed={0.5}
                    zoomSpeed={0.6}
                    enabled={enabledControls}
                />
                <ParticlesBackground />
                <Provider store={store}>
                    {
                        isZoomOut ? "" :
                            <Plane
                                props={{
                                    position: [0, 6, 19],
                                    rotation: [0, Math.PI / 2, 0],
                                    onClick: zoomOut
                                }}
                                message="Zoom out"
                                isShow={isShowZoomChanger}
                            />
                    }

                    {
                        isZoomOut ?
                            <Plane
                                props={{
                                    position: [1, 6, 4],
                                    rotation: [0, Math.PI / 2, 0],
                                    onClick: zoomIn
                                }}
                                width={16}
                                height={13}
                                message="Zoom in"
                                isShow={isShowZoomChanger}
                            /> : ""
                    }

                    <Navigation
                        position={[TV.pos.x, TV.pos.y, TV.pos.z]}
                        scale={TV.scale}
                    />
                    <group
                        position={[TvText.pos.x, TvText.pos.y, TvText.pos.z]}
                    >
                        <LockedTypingTerminal />
                    </group>
                    {
                        isZoomOut ? "" :
                            <Plane
                                props={{
                                    position: [0, 6, -11],
                                    rotation: [0, Math.PI / 2, 0],
                                    onClick: zoomOut,
                                }}
                                isShow={isShowZoomChanger}
                                message="Zoom out"
                            />
                    }
                </Provider>
                {/* <gridHelper args={[30, 30]} />
                <axesHelper args={[100]} /> */}
            </Canvas>
            <LoadingComponent isCanvasLoader={true} progress={progress} total={total} />

            <div
                id="overlayForChangeZoom"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 999,
                    display: "none"
                }}></div>
        </>
    );
}