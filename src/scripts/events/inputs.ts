import { movables, player } from "../Instance";
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

const handleInput = (e: KeyboardEvent, callback: () => void) => {
  switch (e.key) {
    case inputs.up.key:
    case inputs.down.key:
    case inputs.right.key:
    case inputs.left.key:
      callback();
      break;
    default:
      return;
  }
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
      break;
    case inputs.down.key:
      player.image.src = player.sprites.down;
      break;
    case inputs.right.key:
      player.image.src = player.sprites.right;
      break;
    case inputs.left.key:
      player.image.src = player.sprites.left;
      break;
    default:
      player.moving = false;
      break;
  }
};

const movePlayer = (e: KeyboardEvent) => {
  const movement = getAxis(e);
  for (const movable of movables) {
    movable.position.x += movement.x;
    movable.position.y += movement.y;
  }
  setMoving(e);
  handleInput(e, () => {
    player.moving = true;
  });
};

const stopPlayer = (e: KeyboardEvent) => {
  player.moving = false;
};

window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", stopPlayer);
