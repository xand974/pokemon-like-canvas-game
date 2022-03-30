import Sprite from "./Sprite";
import { board, player } from "./Instance";
export default class GameManager {
  private renderedSprites: Sprite[] = [];
  public static Instance: GameManager = new GameManager();

  constructor() {}

  public play() {
    requestAnimationFrame(() => {
      this.play();
    });

    board.draw();
    player.draw();

    // this.renderedSprites = [board];
    // for (const sprite of this.renderedSprites) {
    //   if (sprite !== undefined) sprite.draw();
    // }
  }
}
