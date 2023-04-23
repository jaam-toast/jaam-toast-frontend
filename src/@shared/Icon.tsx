import * as css from "./Icon.css";
import { ColorKeys } from "../@config/colors";

type Size = "small" | "medium" | "large";

export function Icon({
  children,
  size = "medium",
  color = "LAVENDER",
}: {
  children: JSX.Element;
  size?: Size;
  color?: ColorKeys;
}) {
  return (
    <div
      className={`${css.container} ${css.iconSize[size]} ${css.iconColor[color]}`}
    >
      {children}
    </div>
  );
}
