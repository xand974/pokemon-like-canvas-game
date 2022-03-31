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

let lastKey = "";
const getAxis = (e: KeyboardEvent) => {
  const direction = { x: 0, y: 0 };
  let speed = 10;
  switch (true) {
    case e.key === inputs.up.key && lastKey === "z":
      return { ...direction, y: speed };
    case e.key === inputs.down.key && lastKey === "s":
      return { ...direction, y: -speed };
    case e.key === inputs.right.key && lastKey === "d":
      return { ...direction, x: -speed };
    case e.key === inputs.left.key && lastKey === "q":
      return { ...direction, x: speed };
    default:
      return { x: 0, y: 0 };
  }
};

const setMoving = (e: KeyboardEvent) => {
  switch (e.key) {
    case inputs.up.key:
      lastKey = "z";
      player.image.src = player.sprites.up;
      break;
    case inputs.down.key:
      lastKey = "s";
      player.image.src = player.sprites.down;
      break;
    case inputs.right.key:
      lastKey = "d";
      player.image.src = player.sprites.right;
      break;
    case inputs.left.key:
      lastKey = "q";
      player.image.src = player.sprites.left;
      break;
    default:
      player.moving = false;
      break;
  }
};

const movePlayer = (e: KeyboardEvent) => {
  setMoving(e);
  handleInput(e, () => {
    player.moving = true;
  });
  const movement = getAxis(e);

  board.position.x += movement.x;
  board.position.y += movement.y;
};

const stopPlayer = (e: KeyboardEvent) => {
  player.moving = false;
};

window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", stopPlayer);
