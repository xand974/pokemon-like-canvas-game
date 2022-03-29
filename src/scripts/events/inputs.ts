import GameManager from "../classes/GameManager";
import Player from "../classes/Player";
import { playerInfos } from "../objects";
const inputs = {
  up: {
    key: "z",
  },
  left: {
    key: "q",
  },
  down: {
    key: "s",
  },
  right: {
    key: "d",
  },
};
const getAxis = (key: string) => {
  switch (key) {
    case inputs.up.key:
    case inputs.right.key:
      return 1;
    case inputs.down.key:
    case inputs.left.key:
      return -1;
  }
};

const movePlayer = (e: any) => {
  switch (e.key) {
    case inputs.up.key:
      GameManager.Board.position.y += 7;
      console.log(Player.Instance);
      break;
    case inputs.down.key:
      GameManager.Board.position.y -= 7;
      break;
    case inputs.left.key:
      GameManager.Board.position.x += 7;
      break;
    case inputs.right.key:
      GameManager.Board.position.x -= 7;
      break;
  }
};
window.addEventListener("keydown", movePlayer);
