import { useFrame, useThree } from "@react-three/fiber"
import { Dispatch, SetStateAction, useState } from "react";
import { Vector3, Vector3Like } from "three";

interface IProps {
    speed?: number;
    isStartAnimProp?: boolean | null;
    setEnabledControls?: (enabled: boolean) => void;
    setIsStartAnimProp?: Dispatch<SetStateAction<boolean>>;
}

export function useCamer({
    isStartAnimProp = null,
    setIsStartAnimProp = () => { },
    setEnabledControls,
    speed
}: IProps) {
    const { camera } = useThree();
    const [isStartAnim, setStartAnim] = useState<boolean>(false);
    const [status, setStatus] = useState<"idle" | "progress" | "complated">("idle");
    const [cameraPos, setCamerPos] = useState<Vector3Like>(new Vector3(0, 0, 0));

    useFrame(() => {
        if (isStartAnimProp || isStartAnim) {
            camera.position.lerp(cameraPos, speed ? speed : 0.02);
            camera.updateProjectionMatrix();

            if (camera.position.x >= (cameraPos.x - 1)) {
                setIsStartAnimProp(false);
                setStartAnim(false);
                setStatus("complated");
                if (setEnabledControls) {
                    setEnabledControls(true);
                }
            }
        }
    });

    function startSmoothChangePos(pos: Vector3Like) {
        setCamerPos(pos);
        setStartAnim(true);
        setStatus("progress");
    }

    return { startSmoothChangePos, status };
}