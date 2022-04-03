import {
  movables,
  player,
  inputHandler,
  combatSprite,
  htmlCombatsElements,
} from "../Instance";
import SceneManager from "./Scene/SceneManager";
import { Clear } from "./Canvas";

export default class GameManager {
  public static Instance: GameManager = new GameManager();

  constructor() {}

  public play() {
    const id = requestAnimationFrame(() => {
      this.play();
    });

    for (const movable of movables) {
      movable.draw();
    }

    player.draw();
    if (inputHandler.lastKey === "p") {
      cancelAnimationFrame(id);
      Clear();
      SceneManager.Instance.nextScene();
    }
  }

  initCombat() {
    requestAnimationFrame(this.initCombat.bind(this));
    combatSprite.draw();

    for (const el of htmlCombatsElements) {
      el.style.display = "block";
    }
  }
}
