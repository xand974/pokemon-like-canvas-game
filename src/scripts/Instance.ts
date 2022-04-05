import {
  boardInfos,
  combatInfos,
  foregroundInfos,
  playerInfos,
} from "./data/objects";
import { canvas } from "./classes/Canvas";
import Player from "./classes/Entity/Player";
import Sprite from "./classes/Base/Sprite";
import { collisions } from "./data/collision-data";
import { toMultiDimensionArray, toBoundaryArray } from "../utils/array_utils";
import Boundary from "./classes/Boundary";
import InputHandler from "./events/inputs";

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const inputHandler = new InputHandler();
const board = new Sprite({ ...boardInfos });
const player = new Player({
  ...playerInfos,
  position: { ...offset },
});
const sizeOfMapInPixel = 70;
const collisionsArray: number[][] = toMultiDimensionArray(
  collisions,
  sizeOfMapInPixel
);
const foreground = new Sprite({ ...foregroundInfos });
const boundaries: Boundary[] = toBoundaryArray(collisionsArray, 1025);

const movables = [board, foreground, ...boundaries];

const combatSprite = new Sprite({ ...combatInfos });
const deck = document.querySelector("#deck") as HTMLDivElement;
const sidebar = document.querySelector("#sidebar") as HTMLDivElement;
const htmlCombatsElements = [deck, sidebar];

export {
  movables,
  player,
  inputHandler,
  boundaries,
  combatSprite,
  htmlCombatsElements,
};
