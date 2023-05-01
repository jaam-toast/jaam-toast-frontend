import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([s.fullWidth, s.fullHeigth, { flex: 1 }]);

export const wrapper = style([
  s.flexColumn,
  s.border,
  {
    padding: "2rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const buttonWrapper = style([
  s.flex,
  s.flexSpaceBetween,
  s.fullWidth,
  {
    paddingBottom: "1.5rem",
  },
]);

export const header = style([
  s.flex,
  s.fullWidth,
  {
    justifyContent: "space-between",
    position: "sticky",
    zIndex: 10,
    top: 0,
    left: 0,
    padding: "2rem 0",
    backgroundColor: COLORS.WHITE,
    fontWeight: 400,
  },
]);

export const titleWrapper = style([s.flex, s.flexSpaceBetween, {}]);

export const timeWrapper = style([s.flexColumn]);

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
