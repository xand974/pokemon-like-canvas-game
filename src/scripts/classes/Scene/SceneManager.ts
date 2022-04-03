import Scene from "./SceneState";
import { MapScene, CombatScene } from "./SceneState";
import { sceneStates } from "../../data/objects";
export default class SceneManager {
  public scenes: Scene[];
  public currentScene: any;
  public static Instance: SceneManager = new SceneManager();
  constructor() {
    this.scenes = [new MapScene(), new CombatScene()];
    this.currentScene = this.scenes[sceneStates.Map];
  }

  initScene() {
    this.currentScene.enter();
  }

  nextScene() {
    const currentSceneIndex = this.scenes.indexOf(this.currentScene);
    if (currentSceneIndex + 1 > this.scenes.length) {
      this.initScene();
      return;
    }
    this.currentScene = this.scenes[currentSceneIndex + 1];
    this.currentScene.enter();
  }
}
