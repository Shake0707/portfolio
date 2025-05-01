import * as THREE from 'three'
import React, { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Cylinder_1_0: THREE.Mesh
    }
    materials: {
        material: THREE.MeshStandardMaterial
    }
}

export function Navigation(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/models/tvOld.glb') as unknown as GLTFResult;

    return (
        <group {...props} dispose={null}>
            <group scale={0.01}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_1_0.geometry}
                    material={materials.material}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    scale={[1.229, 1.229, 1.723]}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/models/tvOld.glb');