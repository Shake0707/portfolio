import { useCamer } from '@/utils/useCamer';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';

export default function Camera(props: { isFreeCamera: boolean; setEnabledControls: (enabled: boolean) => void }) {
    const { camera } = useThree();
    const { startSmoothChangePos } = useCamer({ chapel: 29, speed: 0.05 });

    useEffect(() => {
        if (props.isFreeCamera) {
            startSmoothChangePos(new Vector3(30, 20, 10));
            props.setEnabledControls(true);
        } else {
            startSmoothChangePos(new Vector3(10.5, 7, 4));
            props.setEnabledControls(false);
        }
    }, [props.isFreeCamera]);

    useFrame(() => {
        camera.lookAt(0, 6.5, 4);
    });

    return <></>
}
