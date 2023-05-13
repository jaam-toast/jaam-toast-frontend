import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([s.fullWidth, s.fullHeigth, { flex: 1 }]);

export const header = style([
  s.flex,
  s.flexSpaceBetween,
  s.fullWidth,
  {
    paddingBottom: "1.5rem",
  },
]);

export const button = style([s.button, s.buttonSize.medium]);

export const prevButton = style([
  s.buttonColor.light,
  {
    ":hover": {
      backgroundColor: COLORS.STRAWBERRY,
      borderColor: "none",
    },
  },
]);

export const saveButton = style([
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: COLORS.STRAWBERRY,
      borderColor: "none",
    },
  },
]);
