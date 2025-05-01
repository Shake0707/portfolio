// import { useSpring, animated } from "@react-spring/three";
import { useAppSelector } from "@/store/store";
import { Html } from "@react-three/drei";
import { JSX, useMemo, useRef, useState } from "react";
import { CanvasTexture, Mesh, RepeatWrapping } from "three";

const createGridTexture = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();

    const texture = new CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
};

export default function Plane(props: {
    props: JSX.IntrinsicElements["mesh"];
    message: string;
    width?: number;
    height?: number;
}) {
    const [hovered, setHovered] = useState(false);
    const texture = useMemo(() => createGridTexture(), []);
    const squareRef = useRef<Mesh>(null);
    const { isGame } = useAppSelector(state => state.terminalSys);

    function corsorOn() {
        setHovered(true);
        document.body.style.cursor = "pointer";
    }

    function cursorOut() {
        setHovered(false);
        document.body.style.cursor = "default";
    }

    // TODO: podzkazka pri navidenii!!!

    const handlePointerMove = () => {
        if (squareRef.current) {
            console.log();

        }
    };

    return (
        <>
            {/* {
                isGame ? "" : */}
                    <mesh
                        ref={squareRef}
                        onPointerOver={corsorOn}
                        onPointerOut={cursorOut}
                        onPointerMove={handlePointerMove}
                        {...props.props}
                    >
                        <planeGeometry args={[props.width ? props.width : 10, props.height ? props.height : 17]} />

                        <meshStandardMaterial
                            map={texture}
                            transparent
                            opacity={hovered ? 1 : 0}
                        />
                        <Html>
                            {
                                hovered ?
                                    <div style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        color: "white",
                                        textWrap: "nowrap",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        pointerEvents: "none",
                                        fontSize: "17px",
                                        backgroundColor: "transparent",
                                        transition: "opacity 0.2s ease",
                                        zIndex: 1000,
                                    }}>
                                        {props.message}
                                    </div>
                                    : ""
                            }

                        </Html>
                    </mesh >
            {/* } */}
        </>
    )
}
