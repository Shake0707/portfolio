import { useFrame, useThree } from '@react-three/fiber';

export default function Camera() {
    const { camera } = useThree();

    useFrame(() => {
        camera.lookAt(0, 6, 4);
    });

    return <></>
}
