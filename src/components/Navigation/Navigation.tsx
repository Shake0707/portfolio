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

useGLTF.preload('/models/tvOld.glb')


// import * as THREE from 'three'
// import { JSX } from 'react'
// import { useGLTF } from '@react-three/drei'
// import { GLTF } from 'three-stdlib'

// type GLTFResult = GLTF & {
//     nodes: {
//         TV_Tube_Material_0: THREE.Mesh
//         TV_Tube_Glow_Glass_0: THREE.Mesh
//     }
//     materials: {
//         Material: THREE.MeshStandardMaterial
//         Glow_Glass: THREE.MeshPhysicalMaterial
//     }
// }

// export function Navigation(props: JSX.IntrinsicElements['group']) {
//     const { nodes, materials } = useGLTF('/models/oldTv.glb') as unknown as GLTFResult
//     return (
//         <group {...props} dispose={null}>
//             <group rotation={[Math.PI / 2, 0, 0]} scale={0.929}>
//                 <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
//                     <group scale={100}>
//                         <mesh
//                             castShadow
//                             receiveShadow
//                             geometry={nodes.TV_Tube_Material_0.geometry}
//                             material={materials.Material}
//                         />
//                         <mesh
//                             castShadow
//                             receiveShadow
//                             geometry={nodes.TV_Tube_Glow_Glass_0.geometry}
//                             material={materials.Glow_Glass}
//                         />
//                     </group>
//                 </group>
//             </group>
//         </group>
//     )
// }

// useGLTF.preload('/models/oldTv.glb');