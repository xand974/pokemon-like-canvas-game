import { boardInfos, playerInfos } from "../data/objects";
import { canvas } from "./Canvas";
import Player from "./Entity/Player";
import Sprite from "./Base/Sprite";

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

export const board = new Sprite({ ...boardInfos });
export const player = new Player({
  ...playerInfos,
  position: { ...offset },
});
