"use client";

import { Html, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classes from "./style.module.css";
import BackgroundCircle from "@/components/BackgroundCircle/BackgroundCircle";
import LoadingComponent from "../Loading/Loading";

export default function About() {
    const { progress, total } = useProgress();

    return (
        <>
            <Canvas
                id="about"
                style={{
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <Html
                    fullscreen
                >
                    <div className={classes.container}>
                        <h1 className={classes.title}>About me</h1>
                        <div className={classes.container_firstBox}>
                            <p className={classes.text}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut optio dolore sapiente, cupiditate cumque fuga in aspernatur omnis eum, odio voluptates, beatae perferendis expedita! Explicabo nisi saepe tenetur inventore dolorum?
                            </p>
                        </div>
                        <div className={classes.container_secondBox}>
                            <p className={classes.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium enim quibusdam veniam possimus, minima quis quidem. Neque, deserunt! Repellendus fugiat dolor quos provident voluptatum quam a doloremque quia nemo rem.</p>
                        </div>
                    </div>
                </Html>
                <BackgroundCircle />
            </Canvas>
            <LoadingComponent isCanvasLoader={true} progress={progress} total={total} />
        </>
    )
}
