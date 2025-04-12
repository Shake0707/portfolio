import { useFrame, useThree } from "@react-three/fiber"
import { useState } from "react";
import { Vector3, Vector3Like } from "three";

export function useCamer(props: { chapel: number, speed?: number }) {
    const { camera } = useThree();
    const [isStartedChangePos, setIsStartedChangePos] = useState<boolean>(false);
    const [cameraPos, setCamerPos] = useState<Vector3Like>(new Vector3(0, 0, 0));

    useFrame(() => {
        if (isStartedChangePos) {
            camera.position.lerp(cameraPos, props.speed ? props.speed : 0.02);

            camera.updateProjectionMatrix();

            if (camera.position.x >= props.chapel) {
                setIsStartedChangePos(false);
                setCamerPos(new Vector3(0, 0, 0));
            }
        }
    });

    function startSmoothChangePos(pos: Vector3Like) {
        setCamerPos(pos);
        setIsStartedChangePos(true);
    }

    return { startSmoothChangePos };
}