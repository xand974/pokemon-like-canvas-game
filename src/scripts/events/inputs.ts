import { board, player } from "../classes/Instance";
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
const getAxis = (e: KeyboardEvent) => {
  const direction = { x: 0, y: 0 };
  let speed = 10;
  switch (e.key) {
    case inputs.up.key:
      return { ...direction, y: speed };
    case inputs.down.key:
      return { ...direction, y: -speed };
    case inputs.right.key:
      return { ...direction, x: -speed };
    case inputs.left.key:
      return { ...direction, x: speed };
    default:
      return { x: 0, y: 0 };
  }
};

const setMoving = (e: KeyboardEvent) => {
  switch (e.key) {
    case inputs.up.key:
      player.image.src = player.sprites.up;
      player.moving = true;
      break;
    case inputs.down.key:
      player.image.src = player.sprites.down;
      player.moving = true;
      break;
    case inputs.right.key:
      player.image.src = player.sprites.right;
      player.moving = true;
      break;
    case inputs.left.key:
      player.image.src = player.sprites.left;
      player.moving = true;
      break;
    default:
      player.moving = false;
      break;
  }
};

const movePlayer = (e: KeyboardEvent) => {
  const movement = getAxis(e);
  board.position.x += movement.x;
  board.position.y += movement.y;
  setMoving(e);
};

const stopPlayer = (e: KeyboardEvent) => {
  player.moving = false;
};

window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", stopPlayer);
