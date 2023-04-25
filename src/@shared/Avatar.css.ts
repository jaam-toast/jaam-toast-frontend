import { style, styleVariants } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flex,
  s.flexCenter,
  {
    border: `1px solid ${COLORS.BLACK}`,
    borderRadius: "2rem",
    flexShrink: 1,
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

export const avatarSkeleton = style([
  s.skeleton,
  {
    flexShrink: 1,
    borderRadius: "2rem",
    backgroundColor: COLORS.GREY_CLEAR,
  },
]);
