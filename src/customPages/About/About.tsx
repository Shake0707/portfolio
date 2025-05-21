"use client";

import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classes from "./style.module.css";
import LoadingComponent from "../Loading/Loading";
import { LavaModel } from "@/components/3D/Lava/Lava";
import GridBackground from "@/components/GridBackground/GridBackground";
import TypeIt from "typeit-react";
import Link from "next/link";

export default function About() {
    const { progress, total } = useProgress();

    return (
        <GridBackground>
            <div className={classes.container}>
                <div className={classes.container_firstBox}>
                    <div className={classes.text}>
                        <h1>Hi, i&apos;m <span>Shakhriyor</span></h1>
                        <h1><TypeIt
                            as="p"
                            options={{
                                loop: true,
                                deleteSpeed: 50
                            }}
                            getBeforeInit={(ins) => {
                                ins
                                    .type("Front-end ")
                                    .pause(1000)
                                    .delete()
                                    .pause(200)
                                    .type("Back-end ")
                                    .pause(1000)
                                    .delete()
                                    .pause(200)
                                    .type("Mobile app ")
                                    .pause(1000)
                                    .delete()
                                    .pause(200)
                                return ins;
                            }}
                        />
                            {" "}developer</h1>
                        <button className={classes.btn}>
                            <Link href={"./contacts"}>
                                Touch me
                            </Link>
                        </button>
                    </div>
                    <Canvas
                        style={{
                            position: "relative"
                        }}
                        camera={{
                            position: [10, 7, 0]
                        }}
                        onMouseDown={e => {
                            (e.target as HTMLDivElement).style.cursor = "grabbing";
                        }}
                        onMouseUp={e => {
                            (e.target as HTMLDivElement).style.cursor = "grab";
                        }}
                    >
                        <LavaModel
                            scale={2}
                            position={[3.5, 0, 0]}
                            rotation={[0, Math.PI / 2, 0]}
                        />
                        {/* <BackgroundCircle /> */}
                        <OrbitControls
                            rotateSpeed={0.5}
                            enableZoom={false}
                        />
                        {/* <ambientLight intensity={3} /> */}
                        {/* <gridHelper args={[30, 30]} />
                        <axesHelper args={[100]} /> */}
                    </Canvas>
                </div>
                <div className={classes.container_secondBox}>
                    <div className={classes.textBox}>
                        <h1>Overview</h1>
                        <p className={classes.text}>
                            As a versatile full-stack developer with specialized expertise in front-end technologies, I bring a comprehensive approach to web development that balances aesthetic appeal with technical performance. My development stack leverages cutting-edge technologies that enhance user experience while maintaining robust functionality.
                        </p>
                    </div>
                </div>

                <LoadingComponent isCanvasLoader={true} progress={progress} total={total} />
            </div>
        </GridBackground>
    )
}