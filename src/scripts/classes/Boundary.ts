import { ctx } from "./Canvas";

export default class Boundary {
  public static Width: number = 66;
  public static Height: number = 66;
  public image: HTMLImageElement;
  public position: { x: number; y: number };

  constructor({ position }: { position: { x: number; y: number } }) {
    this.image = new Image();
    this.position = position;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 0 ,0, 0.5)";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      Boundary.Width,
      Boundary.Height
    );
  }
}
