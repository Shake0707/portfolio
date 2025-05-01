import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture } from "three";
import { Game } from "./core";

const boardSize = 25;

export function useTetrisTexture() {
    const textureRef = useRef<CanvasTexture | null>(null);
    const animationFrameIdRef = useRef<number>(null);

    const texture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 550;

        let game = new Game(canvas, boardSize);

        const texture = new CanvasTexture(canvas);
        textureRef.current = texture;

        let lastTime = performance.now();

        function gameLoop(timeStamp: number) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;

            game.update(deltaTime, timeStamp);

            game.ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.draw();

            texture.needsUpdate = true;

            if (!game.isGameOver) {
                animationFrameIdRef.current = requestAnimationFrame(gameLoop);
            } else {
                game = new Game(canvas, boardSize);
                lastTime = performance.now();
                animationFrameIdRef.current = requestAnimationFrame(gameLoop);
            }
        }

        animationFrameIdRef.current = requestAnimationFrame(gameLoop);

        return { texture, game };
    }, []);

    useEffect(() => {
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, []);

    return texture;
}