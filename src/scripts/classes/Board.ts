import { boardInfos } from "../objects";
import Sprite from "./Sprite";
export default class Board {
  public element = document.querySelector("canvas") as HTMLCanvasElement;
  public static Context: CanvasRenderingContext2D = document
    .querySelector("canvas")
    ?.getContext("2d") as CanvasRenderingContext2D;
  public renderedSprites: Sprite[] = [];
  constructor() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  init() {
    const board = new Sprite(
      boardInfos.src,
      boardInfos.position,
      boardInfos.frames
    );

    this.renderedSprites.push(board);

    for (const sprite of this.renderedSprites) {
      sprite.draw();
    }
  }
}
