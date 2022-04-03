import GameManager from "../GameManager";

export default class Scene {
  public state: string = "";
  constructor() {}
}

export class MapScene extends Scene {
  constructor() {
    super();
  }
  enter() {
    GameManager.Instance.play();
  }
}
export class CombatScene extends Scene {
  constructor() {
    super();
  }
  enter() {
    GameManager.Instance.initCombat();
  }
}
