import Sprite from "./Sprite";
export default class Character extends Sprite {
  public name?: string;
  public health: number;
  public mana: number;
  public lvl?: number;
  constructor({
    position,
    frames,
    sprites,
    lvl,
    src,
  }: {
    position: { x: number; y: number };
    frames: { max: number; val?: number; elapsed?: number };
    sprites: any;
    name?: string;
    lvl?: number;
    src: string;
  }) {
    super({ src, position: position, frames: frames, sprites });
    this.health = 100;
    this.mana = 100;
    this.lvl = lvl;
  }
  public presentation() {
    return `name : ${this.name} , mana : ${this.mana} , level : ${this.lvl}`;
  }
}
