import { useTetrisTexture } from "@/utils/game/createCanvasGameTexture";
import { Html } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import classes from "./style.module.css";
import { Game } from "@/utils/game/core";
import { ThreeEvent } from "@react-three/fiber";
import { useAppDispatch } from "@/store/store";
import { togglIsGame } from "@/store/sileces/terminalSys";

export default function TetrisGame() {
    const { texture, game } = useTetrisTexture();
    const dispatch = useAppDispatch();

    const handleMeshClick = (event: ThreeEvent<MouseEvent>) => {
        if (!event.uv || !texture.image) return;

        const canvasWidth = texture.image.width;
        const canvasHeight = texture.image.height;

        const pixelX = event.uv.x * canvasWidth;
        const pixelY = (1 - event.uv.y) * canvasHeight;

        const dx = pixelX - game.UI.buttonLeftX;
        const dy = pixelY - game.UI.buttonTopY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= game.UI.buttonRadius) {
            dispatch(togglIsGame());
            document.body.style.cursor = "default";
        }
    };

    const handleMeshPointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (!event.uv || !texture.image) return;

        const canvasWidth = texture.image.width;
        const canvasHeight = texture.image.height;

        const pixelX = event.uv.x * canvasWidth;
        const pixelY = (1 - event.uv.y) * canvasHeight;

        const dx = pixelX - game.UI.buttonLeftX;
        const dy = pixelY - game.UI.buttonTopY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= game.UI.buttonRadius) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    };


    const geometry = useMemo(() => {
        const geom = new THREE.PlaneGeometry(18, 14, 30, 50);
        const pos = geom.attributes.position;
        const v3 = new THREE.Vector3();

        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            const r = Math.sqrt(v3.x ** 2 + v3.y ** 2);
            const curveFactor = 0.017 * (r ** 2);
            v3.z -= curveFactor;
            pos.setXYZ(i, v3.x, v3.y, v3.z);
        }

        pos.needsUpdate = true;
        return geom;
    }, []);

    return (
        <mesh geometry={geometry}
            rotation={[0, THREE.MathUtils.degToRad(90), 0]}
            onClick={handleMeshClick}
            onPointerMove={handleMeshPointerMove}
        >
            <meshBasicMaterial map={texture} toneMapped={false} />
            {/* <Html
                className={classes.exitFrame}
            >
                <div className={classes.exit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.5 1v7h1V1z" />
                        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                    </svg>
                </div>
            </Html> */}
        </mesh>
    );
}