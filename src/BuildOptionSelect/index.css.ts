import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1.5rem",
    padding: "2rem 15vw",
  },
]);

export const titleSection = style([s.flexColumn, { gap: "0.5rem" }]);

export const mainTitle = style({
  fontSize: "2rem",
});

export const subTitle = style({
  fontSize: "1rem",
});

export const buildOptionSection = style([s.fullHeigth]);

export const buttonConsole = style([
  s.flex,
  s.flexSpaceBetween,
  { marginBottom: "1rem" },
]);

export const prevButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.light,
]);

export const completeButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
]);

export const buildOption = style([
  s.flexColumn,
  s.border,
  {
    gap: "1rem",
    padding: "1.5rem",
    backgroundColor: colors.LAVENDER,
  },
]);

export const unavailableOption = style({
  backgroundColor: colors.STRAWBERRY,
});

export const buildOptionList = style([s.flexColumn, { gap: "1rem" }]);

export const buildOptionTitle = style({
  fontWeight: 700,
  fontSize: "1.1rem",
});

export const projectNameInput = style({
  textTransform: "lowercase",
});
