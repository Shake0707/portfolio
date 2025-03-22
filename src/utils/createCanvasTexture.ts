import { CanvasTexture, Texture } from "three";
import { getLines } from "./getMultiLineText";
import { TvText } from "@/constants/tvText";

export function createCanvasTexture(text: string): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 550;

    const ctx = canvas.getContext('2d')!;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = '#00ff00';
    ctx.textAlign = 'start';

    const paragraphs = text.split('\n');

    let y = TvText.text.pos.y;

    for (let p = 0; p < paragraphs.length; p++) {
        const lines = getLines(ctx, paragraphs[p], TvText.text.maxWidth);

        lines.forEach((line, index) => {
            ctx.fillText(
                line,
                TvText.text.pos.x,
                y + (index * TvText.text.wordVerticalWrap),
                TvText.text.maxWidth
            );
        });

        y += lines.length * TvText.text.wordVerticalWrap;
    }

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}