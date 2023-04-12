import { ReactElement } from "react";
import * as css from "./Avatar.css";

export function Avatar({
  children,
  size = 4,
  active = false,
}: {
  children: ReactElement | string;
  size?: number;
  active?: boolean;
}) {
  return (
    <div className={`${css.container} ${active ? css.active : css.notActive}`}>
      {children}
    </div>
  );
}
