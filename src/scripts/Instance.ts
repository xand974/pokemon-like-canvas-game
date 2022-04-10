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
import { combats } from "./data/combat";

const sizeOfMapInPixel = 70;
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
const foreground = new Sprite({ ...foregroundInfos });
const collisionsArray: number[][] = toMultiDimensionArray(
  collisions,
  sizeOfMapInPixel
);

const combatArray: number[][] = toMultiDimensionArray(
  combats,
  sizeOfMapInPixel
);
const collisionBoundaries: Boundary[] = toBoundaryArray(collisionsArray, 1025);
const combatBoundaries: Boundary[] = toBoundaryArray(combatArray, 1025);
const movables = [
  board,
  ...combatBoundaries,
  ...collisionBoundaries,
  foreground,
];

const combatSprite = new Sprite({ ...combatInfos });
const deck = document.querySelector("#deck") as HTMLDivElement;
const sidebar = document.querySelector("#sidebar") as HTMLDivElement;
const htmlCombatsElements = [deck, sidebar];

export {
  collisionBoundaries,
  movables,
  player,
  inputHandler,
  combatSprite,
  htmlCombatsElements,
  combatBoundaries,
};
