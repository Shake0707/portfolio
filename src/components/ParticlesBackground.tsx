// import React, { useMemo, useRef } from 'react';
// import { Points, PointMaterial } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const ParticlesBackground = () => {
//     const pointsRef = useRef<THREE.Points>(null);
//     const particlesCount = 10000;

//     const positions = useMemo(() => {
//         const positions = new Float32Array(particlesCount * 3);
//         for (let i = 0; i < particlesCount; i++) {
//             positions[i * 3 + 0] = -10;
//             positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
//             positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
//         }
//         return positions;
//     }, [particlesCount]);

//     useFrame((state, delta) => {
//         if (!pointsRef.current) return;
//         const positionAttr = pointsRef.current.geometry.attributes.position;
//         const positionsArray = positionAttr.array as Float32Array;
//         const len = positionsArray.length;
//         const speed = delta * 0.5;
//         for (let i = 1; i < len; i += 3) {
//             let y = positionsArray[i] + speed;
//             if (y > 50) {
//                 y = -50;
//             }
//             positionsArray[i] = y;
//         }
//         positionAttr.needsUpdate = true;
//     });

//     return (
//         <Points ref={pointsRef} limit={particlesCount} positions={positions} renderOrder={-1}>
//             <PointMaterial
//                 transparent
//                 color="#fff"
//                 size={0.1}
//                 sizeAttenuation
//                 depthWrite={false}
//             />
//         </Points>
//     );
// };

// export default ParticlesBackground;

import React, { useMemo, useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarsInSphereProps {
    count?: number;       // Количество звёзд
    innerRadius?: number; // Внутренний радиус «пустой зоны» (нет звёзд внутри)
    outerRadius?: number; // Внешний радиус сферы (вне этого радиуса тоже нет звёзд)
    drift?: boolean;      // Нужно ли движение звёзд
    speed?: number;       // Скорость движения (если drift=true)
}

/**
 * Распределяем звёзды случайно в сферическом объёме:
 * r между innerRadius и outerRadius.
 */
const StarsInSphere: React.FC<StarsInSphereProps> = ({
    count = 5000,
    innerRadius = 50,
    outerRadius = 100,
    drift = true,
    speed = 2,
}) => {
    const pointsRef = useRef<THREE.Points>(null);

    // Генерация звёзд в сферической оболочке
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        let spawned = 0;
        let i = 0;

        while (spawned < count) {
            // Генерируем случайные сферические координаты
            // r: [0, outerRadius], но проверяем, что r >= innerRadius
            const r = Math.random() * outerRadius;
            const theta = Math.random() * Math.PI * 2;   // угол вокруг оси Y
            const phi = Math.acos(1 - 2 * Math.random()); // угол от "верха" (0..π)

            if (r < innerRadius) {
                // Пропускаем, если r меньше внутреннего радиуса
                continue;
            }

            // Перевод сферических координат -> декартовых
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

    // Если нужно «дрейфовать» звёзды (например, медленно разлетаются от центра)
    useFrame((_, delta) => {
        if (!drift || !pointsRef.current) return;
        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < posArray.length; i += 3) {
            // Увеличиваем радиус точки на speed * delta
            const x = posArray[i + 0];
            const y = posArray[i + 1];
            const z = posArray[i + 2];

            // Рассчитываем расстояние от (0,0,0)
            const dist = Math.sqrt(x * x + y * y + z * z);
            if (dist > 0) {
                // Нормализуем и смещаем по направлению от центра
                const nx = x / dist;
                const ny = y / dist;
                const nz = z / dist;

                // Смещаем точку на speed * delta
                const newDist = dist + speed * delta;
                posArray[i + 0] = nx * newDist;
                posArray[i + 1] = ny * newDist;
                posArray[i + 2] = nz * newDist;

                // Если вышли за outerRadius, возвращаем внутрь (или сбрасываем)
                if (newDist > outerRadius) {
                    // Вернём обратно внутрь (или можно random)
                    const resetDist = innerRadius + Math.random() * (outerRadius - innerRadius);
                    posArray[i + 0] = nx * resetDist;
                    posArray[i + 1] = ny * resetDist;
                    posArray[i + 2] = nz * resetDist;
                }
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={positions} renderOrder={-1}>
            <PointMaterial
                color="#ffffff"
                size={0.5}
                sizeAttenuation
                transparent
                depthWrite={false}
            />
        </Points>
    );
};

export default StarsInSphere;
