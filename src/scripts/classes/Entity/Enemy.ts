import Sprite from "../Base/Sprite";

export default class Enemy extends Sprite {
  constructor({
    position,
    frames,
    src,
    sprites,
  }: {
    position: { x: number; y: number };
    frames: { max: number };
    src: string;
    sprites: {};
  }) {
    super({ position, frames, src, sprites });
  }
}
