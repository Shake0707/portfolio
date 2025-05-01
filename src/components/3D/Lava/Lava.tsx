import * as THREE from 'three';
import React, { JSX, useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export function LavaModel(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const { scene, animations } = useGLTF('/models/lava_lamp_v1.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        const firstAction = Object.values(actions)[0];
        if (firstAction) {
            firstAction.reset().play();
        }
    }, [actions]);

    useFrame(() => {
        camera.lookAt(0, 5, 0)
    });


    return <primitive
        renderOrder={999}
        object={scene}
        ref={group}
        {...props}
    />
}

useGLTF.preload('/models/lava_lamp_v1.glb');