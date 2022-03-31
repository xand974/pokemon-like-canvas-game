import { ctx } from "../Canvas";
export default class Sprite {
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public frames: { max: number; val?: number; elapsed?: number };
  public position: { x: number; y: number };
  public sprites?: any;
  public moving?: boolean;
  public src: string;

  constructor({
    src,
    position,
    frames,
    moving = false,
    sprites,
  }: {
    src: string;
    position: { x: number; y: number };
    frames: { max: number; val?: number; elapsed?: number };
    moving?: boolean;
    sprites?: {};
  }) {
    this.image = new Image();
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.src = src;
    this.image.src = src;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.width = this.image.width / this.frames.max;
    this.height = this.image.height;
    this.position = position;
    this.sprites = sprites;
    this.moving = moving;
  }

  public draw(): void {
    let cropStartX: number = 0;
    if (this.frames.val) cropStartX = this.frames.val * this.width;
    let maxFps = 10;
    ctx.drawImage(
      this.image,
      cropStartX,
      0, //start crop x, y
      this.image.width / this.frames.max,
      this.image.height, //how big is the crop
      this.position.x,
      this.position.y, //position
      this.width,
      this.height // size of the final crop
    );

    if (!this.moving) return;
    if (this.frames.val! > 1) {
      this.frames.elapsed!++;
    }
    if (this.frames.elapsed! % maxFps === 0) {
      if (this.frames.val! < this.frames.max - 1) this.frames.val!++;
      else this.frames.val = 0;
    }
  }
}
