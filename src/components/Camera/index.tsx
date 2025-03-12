import { useFrame, useThree } from '@react-three/fiber';

export default function Camera() {
    const { camera } = useThree();

    useFrame(() => {
        camera.lookAt(0, 0.2, 0);
    });

    return <></>
}
