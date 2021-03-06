import { collisionBoundaries, movables, player } from "../Instance";
import { isColliding } from "../../utils/collision";

// TODO Faudra Refactor
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
    p: {
      pressed: false,
    },
  };
  constructor() {
    this.lastKey = "";
    window.addEventListener("keydown", this.movePlayer.bind(this));

    window.addEventListener("keyup", (e) => {
      player.moving = false;
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
      case "p":
        this.inputs.p.pressed = true;
        this.lastKey = "p";
        player.moving = false;
        break;
    }
  }

  setMoving() {
    let moving = true;
    const speed = 10;
    player.moving = false;
    if (this.inputs.z.pressed && this.lastKey === "z") {
      player.moving = true;
      for (let i = 0; i < collisionBoundaries.length; i++) {
        const boundary = collisionBoundaries[i];
        if (
          isColliding({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 10,
              },
            },
          })
        ) {
          player.moving = false;
          moving = false;
          break;
        }
      }
      if (moving)
        for (const movable of movables) {
          movable.position.y += speed;
        }
    }
    if (this.inputs.q.pressed && this.lastKey === "q") {
      player.moving = true;
      for (let i = 0; i < collisionBoundaries.length; i++) {
        const boundary = collisionBoundaries[i];
        if (
          isColliding({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x + 10,
                y: boundary.position.y,
              },
            },
          })
        ) {
          player.moving = false;
          moving = false;
          break;
        }
      }
      if (moving)
        for (const movable of movables) {
          movable.position.x += speed;
        }
    }
    if (this.inputs.s.pressed && this.lastKey === "s") {
      player.moving = true;
      for (let i = 0; i < collisionBoundaries.length; i++) {
        const boundary = collisionBoundaries[i];
        if (
          isColliding({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 10,
              },
            },
          })
        ) {
          player.moving = false;
          moving = false;
          break;
        }
      }
      if (moving)
        for (const movable of movables) {
          movable.position.y -= speed;
        }
    }
    if (this.inputs.d.pressed && this.lastKey === "d") {
      player.moving = true;
      for (let i = 0; i < collisionBoundaries.length; i++) {
        const boundary = collisionBoundaries[i];
        if (
          isColliding({
            rectangle1: player,
            rectangle2: {
              ...boundary,
              position: {
                x: boundary.position.x - speed,
                y: boundary.position.y,
              },
            },
          })
        ) {
          player.moving = false;
          moving = false;
          break;
        }
      }
      if (moving)
        for (const movable of movables) {
          movable.position.x -= speed;
        }
    }
    if (this.inputs.p.pressed && this.lastKey === "p") {
      moving = false;
      return;
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
