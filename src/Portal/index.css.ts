import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flex,
  s.justifyContentCenter,
  s.full,
  {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 9,
    transition: "opacity 3s",
  },
]);

export const hide = style({ display: "none" });
