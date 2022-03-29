import Canvas from "./Board";
export default class Sprite {
  public width: number;
  public height: number;
  private image: HTMLImageElement;
  public frames: { max: number; val: number; elapsed?: number } = {
    max: 1,
    val: 0,
  };
  public position: { x: number; y: number };

  constructor(
    src: string,
    position: { x: number; y: number },
    frames: { max: number; val: number; elapsed?: number }
  ) {
    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.width = this.image.width / this.frames.max;
    this.height = this.image.height;
    this.position = position;
  }

  public draw(): void {
    const cropStart = this.frames.val * this.width;
    let maxFps = 10;
    Canvas.Context.drawImage(
      this.image,
      cropStart,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width,
      this.height
    );

    if (this.frames.elapsed)
      if (this.frames.val > 1) {
        this.frames.elapsed++;
      }

    if (this.frames.elapsed)
      if (this.frames.elapsed % maxFps === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++;
        else this.frames.val = 0;
      }
  }
}
