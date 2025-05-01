import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import type { Points as PointsType } from "three";


export const ParticlesBackground = () => {
    const ref = useRef<PointsType | null>(null);
    const count = 5000;
    const outerRadius = 100;
    const innerRadius = 45;

    const sphere = useMemo(() => {
        const arr = new Float32Array(count * 3);
        let spawned = 0;
        let i = 0;

        while (spawned < count) {
            const r = Math.random() * outerRadius;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(1 - 2 * Math.random());

            if (r < innerRadius) {
                continue;
            }

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            arr[i + 0] = x;
            arr[i + 1] = y;
            arr[i + 2] = z;

            i += 3;
            spawned++;
        }

        return arr;
    }, [count, innerRadius, outerRadius]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 25;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                stride={3}
                positions={new Float32Array(sphere)}
                frustumCulled
            >
                <PointMaterial
                    transparent
                    color="#fff"
                    size={0.25}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};
