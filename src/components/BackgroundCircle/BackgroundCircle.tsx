import { useMemo } from "react";
import * as THREE from "three";

export default function BackgroundCircle() {
    const texture = useMemo(() => {
        const size = 1000;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d')!;
        const gradient = ctx.createRadialGradient(
            size / 2, size / 2, 10,
            size / 2, size / 2, size / 2
        );
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');    // center - bright red
        gradient.addColorStop(0.6, 'rgba(255, 0, 0, 0.4)'); // outer - soft red
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');     // fully transparent

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        const tex = new THREE.CanvasTexture(canvas);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.format = THREE.RGBAFormat;

        return tex;
    }, []);

    return (
        <mesh position={[0, -5, 0]}>
            <planeGeometry args={[21, 12]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    );
}