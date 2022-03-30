import { boardInfos, playerInfos } from "../objects";
import { canvas } from "./Canvas";
import Player from "./Player";
import Sprite from "./Sprite";

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

export const board = new Sprite({ ...boardInfos });
export const player = new Player({ ...playerInfos, position: { ...offset } });
