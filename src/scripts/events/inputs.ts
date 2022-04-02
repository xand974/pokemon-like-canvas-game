import { movables, player, testBoundary } from "../Instance";
import Boundary from "../classes/Boundary";
import { BoundaryType } from "../types";
import Sprite from "../classes/Base/Sprite";

//#region variables
let lastKey = "";
const inputs = {
  z: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
//#endregion
//#region inputs
const setInputs = (e: KeyboardEvent) => {
  switch (e.key) {
    case "z":
      player.image.src = player.sprites.up;
      inputs.z.pressed = true;
      lastKey = "z";
      break;
    case "s":
      player.image.src = player.sprites.down;
      inputs.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      player.image.src = player.sprites.right;
      inputs.d.pressed = true;
      lastKey = "d";
      break;
    case "q":
      player.image.src = player.sprites.left;
      inputs.q.pressed = true;
      lastKey = "q";
      break;
  }
};

export const setMoving = () => {
  let moving = true;
  const speed = 10;
  if (inputs.z.pressed && lastKey === "z") {
    if (
      isColliding({
        rectangle1: player,
        rectangle2: {
          ...testBoundary,
          position: {
            x: testBoundary.position.x,
            y: testBoundary.position.y + 10,
          },
        },
      })
    ) {
      moving = false;
    }
    if (moving)
      for (const movable of movables) {
        movable.position.y += speed;
      }
  }
  if (inputs.q.pressed && lastKey === "q") {
    if (
      isColliding({
        rectangle1: player,
        rectangle2: {
          ...testBoundary,
          position: {
            x: testBoundary.position.x + 10,
            y: testBoundary.position.y,
          },
        },
      })
    ) {
      moving = false;
    }
    if (moving)
      for (const movable of movables) {
        movable.position.x += speed;
      }
  }
  if (inputs.s.pressed && lastKey === "s") {
    if (
      isColliding({
        rectangle1: player,
        rectangle2: {
          ...testBoundary,
          position: {
            x: testBoundary.position.x,
            y: testBoundary.position.y - 10,
          },
        },
      })
    ) {
      moving = false;
    }
    if (moving)
      for (const movable of movables) {
        movable.position.y -= speed;
      }
  }
  if (inputs.d.pressed && lastKey === "d") {
    if (
      isColliding({
        rectangle1: player,
        rectangle2: {
          ...testBoundary,
          position: {
            x: testBoundary.position.x - speed,
            y: testBoundary.position.y,
          },
        },
      })
    ) {
      moving = false;
    }
    if (moving)
      for (const movable of movables) {
        movable.position.x -= speed;
      }
  }
};

const stopPlayer = (e: KeyboardEvent) => {
  switch (e.key) {
    case "z":
      inputs.z.pressed = false;
      break;
    case "s":
      inputs.s.pressed = false;
      break;
    case "d":
      inputs.d.pressed = false;
      break;
    case "q":
      inputs.q.pressed = false;
      break;
  }
};
//#endregion
const isColliding = ({
  rectangle1,
  rectangle2,
}: {
  rectangle1: Sprite;
  rectangle2: Partial<BoundaryType>;
}) => {
  if (!rectangle2.position) return;
  const checkLeftToRight =
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + Boundary.Width;
  const checkBottomToTop =
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + Boundary.Height;

  return checkLeftToRight && checkBottomToTop;
};

const movePlayer = (e: KeyboardEvent) => {
  setInputs(e);
  setMoving();

  stopPlayer(e);
};

window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", stopPlayer);
