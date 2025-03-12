import React, { useMemo, useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticlesBackground: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const particlesCount = 10000;

    const positions = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3 + 0] = -10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
        }
        return positions;
    }, [particlesCount]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        const positionAttr = pointsRef.current.geometry.attributes.position;
        const positionsArray = positionAttr.array as Float32Array;
        const len = positionsArray.length;
        const speed = delta * 0.5;
        for (let i = 1; i < len; i += 3) {
            let y = positionsArray[i] + speed;
            if (y > 50) {
                y = -50;
            }
            positionsArray[i] = y;
        }
        positionAttr.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} limit={particlesCount} positions={positions} renderOrder={-1}>
            <PointMaterial
                transparent
                color="#fff"
                size={0.1}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
};

export default ParticlesBackground;