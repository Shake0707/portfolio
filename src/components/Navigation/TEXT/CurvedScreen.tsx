import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createCanvasTexture } from '@/utils/createCanvasTexture';

function CurvedScreen({ text }: { text: string }) {
    const texture = useMemo(() => createCanvasTexture(text), [text]);

    const geometry = useMemo(() => {
        const geom = new THREE.PlaneGeometry(18, 14, 30, 50);
        const pos = geom.attributes.position;
        const v3 = new THREE.Vector3();

        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);

            const r = Math.sqrt(v3.x ** 2 + v3.y ** 2);
            const curveFactor = 0.017 * (r ** 2);
            v3.z -= curveFactor;

            pos.setXYZ(i, v3.x, v3.y, v3.z);
        }

        pos.needsUpdate = true;
        return geom;
    }, []);

    return (
        <mesh geometry={geometry}
            rotation={[0, THREE.MathUtils.degToRad(90), 0]}
        >
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
}

export default CurvedScreen;
