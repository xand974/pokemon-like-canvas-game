import Sprite from "./Base/Sprite";
import { board, player } from "./Instance";
export default class GameManager {
  private movables: Sprite[] = [];

  public static Instance: GameManager = new GameManager();

  constructor() {}

  public play() {
    requestAnimationFrame(() => {
      this.play();
    });

    board.draw();
    player.draw();
  }
}
