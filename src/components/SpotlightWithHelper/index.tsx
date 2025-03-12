import { useRef } from "react";
import { SpotLight } from "three";

export function SpotLightWithHelper() {
    const light = useRef<SpotLight>(null);

    return (
        <>
            <spotLight ref={light} position={[10, 0, 0]} intensity={1} />
            {light.current && <spotLightHelper args={[light.current, "red"]} />}
        </>
    )
}