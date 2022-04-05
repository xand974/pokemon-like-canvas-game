import { movables, player } from "../Instance";
export default class GameManager {
  public static Instance: GameManager = new GameManager();

  constructor() {}

  public play() {
    requestAnimationFrame(() => {
      this.play();
    });

    for (const movable of movables) {
      movable.draw();
    }
    player.draw();
  }
}
