import Sprite from "../classes/Base/Sprite";
type ActionType = {
  attack: {
    name: string;
    type: string;
    damage: string;
  };
  target: Sprite;
};
export default interface IAction {
  attack: ({ attack, target }: ActionType) => void;
}
