import { boardInfos, playerInfos } from "./data/objects";
import { canvas } from "./classes/Canvas";
import Player from "./classes/Entity/Player";
import Sprite from "./classes/Base/Sprite";
import { collisions } from "./data/collision-data";
import { toMultiDimensionArray, toBoundaryArray } from "../utils/array_utils";
import Boundary from "./classes/Boundary";

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

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
const boundaries: Boundary[] = toBoundaryArray(collisionsArray, 1025);
const testBoundary = new Boundary({
  position: { x: offset.x, y: offset.y - 100 },
});
const movables = [board, testBoundary];

export { movables, player, testBoundary };
