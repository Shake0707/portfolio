import { Game } from "./index";

export class UI {
  game: Game;
  fontFamily: string;
  fontSize: number;
  private BTN_SIZE_WIDTH: number;
  private BTN_SIZE_HEIGHT: number;
  readonly buttonLeftX: number;
  readonly buttonTopY: number;
  readonly buttonRadius: number;

  constructor(game: Game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Helvetica";
    
    this.BTN_SIZE_WIDTH = this.game.canvas.width / this.game.boardSize;
    this.BTN_SIZE_HEIGHT = this.game.canvas.height / this.game.boardSize
    this.buttonLeftX = (this.game.boardSize - this.game.spaceWidth) * (this.BTN_SIZE_WIDTH + 2);
    this.buttonTopY = this.BTN_SIZE_HEIGHT * 2.5;
    this.buttonRadius = 15;
  }

  getMaxWidth(shape: string[][]): number {
    let maxWidth = 0; 2
    for (let row of shape) {
      let rowWidth = 0;

      for (let element of row) {
        if (element) {
          rowWidth++;
        }
      }
      if (rowWidth > maxWidth) {
        maxWidth = rowWidth;
      }
    }
    return maxWidth;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    // Exit
    context.arc(this.buttonLeftX, this.buttonTopY, this.buttonRadius, 0, 2 * Math.PI);
    context.strokeStyle = "white";
    context.stroke();

    const centerY = this.buttonTopY;
    const radius = this.buttonRadius - 5;

    const svgCode = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
            <path d="M7.5 1v7h1V1z"/>
            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
        </svg>
    `;

    const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      context.drawImage(img, this.buttonLeftX - radius, centerY - radius, radius * 2, radius * 2);
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;

    // Exit

    // Draw the next text:
    const BLOCK_SIZE_WIDTH = this.game.canvas.width / this.game.boardSize;
    const BLOCK_SIZE_HEIGHT = this.game.canvas.height / this.game.boardSize;

    const leftX =
      (this.game.boardSize - this.game.spaceWidth) * BLOCK_SIZE_WIDTH;
    const rightX = this.game.canvas.width;

    const textMetrics = context.measureText("Next");

    context.fillStyle = "white";
    context.fillText(
      "Next",
      leftX + (rightX - leftX) / 2 - textMetrics.width / 2,
      (BLOCK_SIZE_HEIGHT + 15) * 4
    );
    context.fillStyle = "white";

    context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
    context.textAlign = "left";

    // Draw the next Tetromino:
    if (this.game.nextTetromino) {
      const shape = this.game.nextTetromino.shape;

      // Calculate the starting X position to center the shape inside the spaceWidth
      const shapeWidth = shape[0].length; // The width of the Tetromino in blocks
      const spaceWidthInBlocks = this.game.spaceWidth; // The width of the space in blocks
      const startX =
        this.game.boardSize -
        spaceWidthInBlocks +
        Math.floor((spaceWidthInBlocks - shapeWidth) / 2); // Calculate the centered X position

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          const blockType = shape[row][col];
          if (blockType) {
            const color = this.game.getBlockColor();
            this.game.drawBlock(startX + col, 6 + row + 3, color); // 6 is the vertical position
          }
        }
      }
    }

    // draw score:
    const textMetricsScore = context.measureText("Score");
    context.fillStyle = "white";
    context.fillText(
      "Score",
      leftX + (rightX - leftX) / 2 - textMetricsScore.width / 2,
      13 * (BLOCK_SIZE_HEIGHT + 3)
    );

    const numberMetricsScore = context.measureText("" + this.game.points);
    context.fillText(
      "" + this.game.points,
      leftX + (rightX - leftX) / 2 - numberMetricsScore.width / 2,
      15 * (BLOCK_SIZE_HEIGHT + 3)
    );

    // draw level:
    const textMetricsLevel = context.measureText("Level");
    context.fillText(
      "Level",
      leftX + (rightX - leftX) / 2 - textMetricsLevel.width / 2,
      21 * BLOCK_SIZE_HEIGHT
    );
    context.fillStyle = "white";

    const numberMetricsLevel = context.measureText("" + this.game.points);
    context.fillText(
      "" + this.game.level,
      leftX + (rightX - leftX) / 2 - numberMetricsLevel.width / 2,
      23 * BLOCK_SIZE_HEIGHT
    );
  }
}
