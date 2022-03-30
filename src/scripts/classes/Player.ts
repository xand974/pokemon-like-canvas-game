import Sprite from "./Sprite";
import IAction from "../interfaces/IActions";

export default class Player extends Sprite implements IAction {
  public name?: string;
  public health: number;
  public src: string;
  constructor({
    src,
    position,
    frames,
    sprites,
    name,
  }: {
    src: string;
    position: { x: number; y: number };
    frames: { max: number; val?: number; elapsed?: number };
    sprites: any;
    name?: string;
  }) {
    super({ src: src, position: position, frames: frames, sprites });
    this.src = src;
    this.name = name;
    this.health = 100;
  }

  attack({
    attack,
    target,
  }: {
    attack: { name: string; type: string; damage: string };
    target: Sprite;
  }): void {}
}
