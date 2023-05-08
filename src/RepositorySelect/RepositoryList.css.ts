import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([s.full]);

export const repoOptionList = style([
  s.full,
  s.border,
  s.scroll,
  {
    overflow: "scroll",
    padding: "0.5rem 0",
    backgroundColor: COLORS.WHITE,
  },
]);

export const repoOption = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
  {
    height: "3.5rem",
    lineHeight: "3.5rem",
    padding: "0 1.5rem",
    userSelect: "none",
    ":hover": {
      backgroundColor: COLORS.PAPER,
    },
  },
]);

export const repoOptionHead = style([
  s.flex,
  s.alignItemsCenter,
  { gap: "1rem", lineHeight: "3.5rem" },
]);

export const packageIcon = style([
  s.full,
  { backgroundColor: COLORS.GREY_CLEAR },
]);

export const importButton = style([
  s.button,
  s.buttonColor.light,
  s.buttonSize.small,
]);

export const textSkeleton = style([
  s.skeleton,
  {
    borderRadius: "1.5rem",
    width: "10rem",
    height: "2rem",
  },
]);

export const buttonSkeleton = style([
  s.skeleton,
  s.buttonSize.small,
  { borderRadius: "1.5rem", width: "6rem" },
]);
