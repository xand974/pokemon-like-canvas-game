import Sprite from "../Base/Sprite";
import IAction from "../../interfaces/IActions";
import Character from "../Base/Character";

export default class Player extends Character implements IAction {
  constructor({
    src,
    position,
    frames,
    sprites,
    name,
    lvl = 1,
  }: {
    src: string;
    position: { x: number; y: number };
    frames: { max: number; val?: number; elapsed?: number };
    sprites: any;
    name?: string;
    lvl: number;
  }) {
    super({ src, position: position, frames: frames, sprites, name, lvl });
  }

  attack({
    attack,
    target,
  }: {
    attack: { name: string; type: string; damage: string };
    target: Sprite;
  }): void {}
}
