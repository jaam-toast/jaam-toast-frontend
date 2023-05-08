import * as css from "./ColorBox.css";
import { ColorKeys } from "../@config/colors";
import { createRandomNumberInRange as getRandomNumber } from "../@utils/createRandomNumberInRange";

type Size = "small" | "medium" | "large";

export function ColorBox({
  children,
  size = "medium",
  color = "LAVENDER",
  randomColor = false,
}: {
  children: JSX.Element;
  size?: Size;
  color?: ColorKeys;
  randomColor?: boolean;
}) {
  const style = randomColor
    ? {
        backgroundColor: `rgb(
          180,
          195,
          ${getRandomNumber(200, 237)})`,
      }
    : {};

  return (
    <div
      style={style}
      className={`${css.container} ${css.iconSize[size]} ${css.iconColor[color]} `}
    >
      {children}
    </div>
  );
}
