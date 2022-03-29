import Canvas from "./GameManager";
export default class Sprite {
  public width: number;
  public height: number;
  private image: HTMLImageElement;
  public frames: { max: number; val?: number; elapsed?: number };
  public position: { x: number; y: number };
  public sprites?: any;

  constructor({
    src,
    position,
    frames,
    sprites,
  }: {
    src: string;
    position: { x: number; y: number };
    frames: { max: number; val?: number; elapsed?: number };
    sprites?: {};
  }) {
    this.image = new Image();
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      this.draw();
    };
    this.image.src = src;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.width = this.image.width / this.frames.max;
    this.height = this.image.height;
    this.position = position;
    this.sprites = sprites;
  }

  public draw(): void {
    let cropStartX: number = 0;
    if (this.frames.val) cropStartX = this.frames.val * this.width;
    let maxFps = 10;
    Canvas.Context.drawImage(
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

    if (this.frames.elapsed && this.frames.val)
      if (this.frames.val > 1) {
        this.frames.elapsed++;
      }

    if (this.frames.elapsed && this.frames.val)
      if (this.frames.elapsed % maxFps === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++;
        else this.frames.val = 0;
      }
  }
}
