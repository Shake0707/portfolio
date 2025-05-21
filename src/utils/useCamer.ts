import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";

export function useCamer() {
    const { camera } = useThree();
    const [isAnimating, setAnimating] = useState(false);
    const [targetPos, setTargetPos] = useState<Vector3 | null>(null);

    useFrame(() => {
        if (!isAnimating || !targetPos) return;

        camera.position.lerp(targetPos, 0.02);
        camera.updateProjectionMatrix();

        if (camera.position.distanceTo(targetPos) < 0.1) {
            setAnimating(false);
        }
    });

    function startSmoothChangePos(pos: Vector3) {
        setTargetPos(pos);
        setAnimating(true);
    }

    return { startSmoothChangePos };
}