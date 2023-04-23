import { style, styleVariants } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.inlineFlex,
  s.flexCenter,
  {
    borderRadius: "0.4rem",
    backgroundColor: colors.STRAWBERRY,
    color: colors.WHITE,
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

const base = style({ color: colors.WHITE });

export const iconColor = styleVariants(colors.COLOR, color => [
  base,
  { backgroundColor: color },
]);
