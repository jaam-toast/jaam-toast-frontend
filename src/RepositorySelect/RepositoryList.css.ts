import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.full,
  s.boder,
  {
    backgroundColor: colors.WHITE,
  },
]);

export const repoOptionList = style([
  s.scroll,
  {
    height: "18.5rem",
    overflow: "scroll",
    padding: "0.5rem 0",
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
  { gap: "1rem", lineHeight: "3.5rem" },
]);

export const importButton = style([
  s.button,
  s.buttonColor.light,
  s.buttonSize.small,
  {
    margin: "auto 0",
  },
]);
