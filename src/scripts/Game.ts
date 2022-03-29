import Board from "./classes/Board";

export const play = () => {
  requestAnimationFrame(play);
  const board = new Board();
  board.init();
};
