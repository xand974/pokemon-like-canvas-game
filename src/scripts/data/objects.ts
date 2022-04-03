export const playerInfos = {
  src: "../assets/images/playerDown.png",
  sprites: {
    up: "../assets/images/playerUp.png",
    down: "../assets/images/playerDown.png",
    left: "../assets/images/playerLeft.png",
    right: "../assets/images/playerRight.png",
  },
  frames: {
    max: 4,
  },
  name: "NOUVEAU PLAYER",
  lvl: 1,
};
export const offsetMap = {
  x: -1800,
  y: -100,
};
export const boardInfos = {
  src: "../assets/images/PokemonGameMap.png",
  position: {
    ...offsetMap,
  },
  frames: {
    max: 1,
  },
};
export const foregroundInfos = {
  src: "../assets/images/Foreground.png",
  position: {
    ...offsetMap,
  },
  frames: {
    max: 1,
  },
};
