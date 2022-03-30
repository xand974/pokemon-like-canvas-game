import GameManager from "../classes/GameManager";
import { board } from "../classes/Instance";
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
      board.position.y += 7;
      break;
    case inputs.down.key:
      board.position.y -= 7;
      break;
    case inputs.left.key:
      board.position.x += 7;
      break;
    case inputs.right.key:
      board.position.x -= 7;
      break;
  }
};
window.addEventListener("keydown", movePlayer);
