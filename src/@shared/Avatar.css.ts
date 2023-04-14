import { style, styleVariants } from "@vanilla-extract/css";
import * as colors from "../@config/colors";
import { s } from "../@styles";

export const container = style([
  s.flex,
  s.flexCenter,
  {
    width: "2.5rem",
    height: "2.5rem",
    border: `1px solid ${colors.BLACK}`,
    borderRadius: "2rem",
    flexShrink: 1,
    lineHeight: "2rem",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.25rem",
    overflow: "hidden",
  },
]);

export const avatarSize = styleVariants({
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
