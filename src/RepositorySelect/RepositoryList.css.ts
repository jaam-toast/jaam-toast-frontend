import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([s.full]);

export const repoOptionList = style([
  s.full,
  s.boder,
  s.scroll,
  {
    overflow: "scroll",
    padding: "0.5rem 0",
    backgroundColor: colors.WHITE,
  },
]);

export const repoOption = style([
  s.flex,
  s.flexSpaceBetween,
  {
    height: "3.5rem",
    lineHeight: "3.5rem",
    padding: "0 1.5rem",
    userSelect: "none",
    ":hover": {
      backgroundColor: colors.PAPER,
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
  { backgroundColor: colors.GREY_CLEAR },
]);

export const importButton = style([
  s.button,
  s.buttonColor.light,
  s.buttonSize.small,
  {
    margin: "auto 0",
  },
]);
