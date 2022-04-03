import { movables, player, testBoundary } from "../Instance";
import { isColliding } from "../../utils/collision";

export default class InputHandler {
  public lastKey: string;
  public inputs = {
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
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", this.movePlayer.bind(this));

    window.addEventListener("keyup", (e) => {
      this.stopPlayer(e);
    });
  }
  movePlayer(e: KeyboardEvent) {
    this.setInputs(e);
    this.setMoving();
    this.stopPlayer(e);
  }
  setInputs(e: KeyboardEvent) {
    switch (e.key) {
      case "z":
        player.image.src = player.sprites.up;
        this.inputs.z.pressed = true;
        this.lastKey = "z";
        break;
      case "s":
        player.image.src = player.sprites.down;
        this.inputs.s.pressed = true;
        this.lastKey = "s";
        break;
      case "d":
        player.image.src = player.sprites.right;
        this.inputs.d.pressed = true;
        this.lastKey = "d";
        break;
      case "q":
        player.image.src = player.sprites.left;
        this.inputs.q.pressed = true;
        this.lastKey = "q";
        break;
    }
  }

  setMoving() {
    let moving = true;
    const speed = 10;
    if (this.inputs.z.pressed && this.lastKey === "z") {
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
    if (this.inputs.q.pressed && this.lastKey === "q") {
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
    if (this.inputs.s.pressed && this.lastKey === "s") {
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
    if (this.inputs.d.pressed && this.lastKey === "d") {
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
  }
  stopPlayer(e: KeyboardEvent) {
    switch (e.key) {
      case "z":
        this.inputs.z.pressed = false;
        break;
      case "s":
        this.inputs.s.pressed = false;
        break;
      case "d":
        this.inputs.d.pressed = false;
        break;
      case "q":
        this.inputs.q.pressed = false;
        break;
    }
  }
}
