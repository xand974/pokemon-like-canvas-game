import GameManager from "./classes/GameManager";
import "./events/inputs";
export const play = () => {
  GameManager.Instance?.init();
  GameManager.Instance?.update();
};
