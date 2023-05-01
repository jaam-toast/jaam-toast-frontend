import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const accentVar = createVar();

export const accentText = style({
  backgroundColor: accentVar,
});

export const container = style([
  s.inlineFlex,
  s.flexCenter,
  {
    borderRadius: "0.4rem",
    backgroundColor: COLORS.STRAWBERRY,
    color: COLORS.WHITE,
  },
]);

export const iconSize = styleVariants({
  small: {
    width: "2rem",
    height: "2rem",
  },
  medium: {
    width: "2.5rem",
    height: "2.5rem",
  },
  large: {
    width: "3rem",
    height: "3rem",
  },
});

const base = style({ color: COLORS.WHITE });

export const iconColor = styleVariants(COLORS, color => [
  base,
  { backgroundColor: color },
]);
