import { boardInfos, playerInfos } from "../objects";
import Sprite from "./Sprite";
import Player from "./Player";
export default class GameManager {
  public static Element = document.querySelector("canvas") as HTMLCanvasElement;
  public static Context = GameManager.Element.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  private renderedSprites: Sprite[] = [];
  public static Instance: GameManager = new GameManager();
  public static Board: Sprite = new Sprite({ ...boardInfos });

  constructor() {
    GameManager.Element.height = window.innerHeight;
    GameManager.Element.width = window.innerWidth;
  }

  public init() {
    const offset = {
      x: GameManager.Element.width / 2,
      y: GameManager.Element.height / 2,
    };
    const player = new Player({
      ...playerInfos,
      position: { ...offset },
    });

    this.renderedSprites = [GameManager.Board, player];
    for (const sprite of this.renderedSprites) {
      sprite.draw();
    }
  }
  public update() {
    for (const sprite of this.renderedSprites) {
      sprite.draw();
    }

    requestAnimationFrame(() => {
      this.update();
    });
  }
}
