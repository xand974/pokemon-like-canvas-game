import { boundaries, movables, player } from "../Instance";
import { isColliding } from "../../utils/collision";

// TODO Faudra Refactor
export default class InputHandler {
  public lastKey: string;
  public keys: string[];
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
    this.keys = [];
    this.lastKey = "";
    window.addEventListener("keydown", this.movePlayer.bind(this));

    window.addEventListener("keyup", (e) => {
      // TODO handle over keys
      if (
        (e.key === "z" || e.key === "s" || e.key === "q" || e.key === "d") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      player.moving = false;
      this.stopPlayer(e);
    });
  }
  movePlayer(e: KeyboardEvent) {
    //push keys in keys array
    if (
      (e.key === "z" || e.key === "s" || e.key === "q" || e.key === "d") &&
      this.keys.indexOf(e.key) === -1
    ) {
      this.keys.push(e.key);
    }
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
    player.moving = false;
    if (this.inputs.z.pressed && this.lastKey === "z") {
      player.moving = true;
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
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
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
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
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
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
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
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
