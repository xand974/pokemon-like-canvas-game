import Sprite from "../scripts/classes/Base/Sprite";
import { BoundaryType } from "../scripts/types/index";
import Boundary from "../scripts/classes/Boundary";
export const isColliding = ({
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
