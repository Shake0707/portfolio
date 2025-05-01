import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useState } from "react";
import { Vector3 } from "three";

interface IProps {
    isZoomOut: boolean;
    setEnableControls: Dispatch<SetStateAction<boolean>>;
    isStartAnim: boolean;
    setIsStartAnim: Dispatch<SetStateAction<boolean>>
}

export default function CameraChange({ isZoomOut, setEnableControls, isStartAnim, setIsStartAnim }: IProps) {
    const { camera } = useThree();

    useFrame(() => {
        if (isStartAnim) {
            if (!isZoomOut) {
                camera.position.lerp(new Vector3(10.5, 7, 4), 0.05);
                camera.updateProjectionMatrix();

                if (camera.position.x <= 9) {
                    setIsStartAnim(false);
                }
            } else {
                camera.position.lerp(new Vector3(30, 20, 10), 0.05);
                camera.updateProjectionMatrix();

                if (camera.position.x >= 29) {
                    setIsStartAnim(false);
                    setEnableControls(true);
                }
            }
        }
    });

    return "";
}
