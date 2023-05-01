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

export const header = style([
  s.flex,
  s.flexSpaceBetween,
  s.fullWidth,
  {
    paddingBottom: "1.5rem",
  },
]);

export const titleContainer = style([
  s.flexColumn,
  s.fullWidth,
  {
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

export const schemaNameSection = style([s.flexColumn, { gap: "1rem" }]);

export const fieldSubText = style([
  {
    paddingTop: "1rem",
    fontSize: "0.9rem",
    color: COLORS.GREY,
  },
]);

export const fieldHeader = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
]);

export const fieldTypeWrapper = style([s.flex, { gap: "1rem" }]);

export const fieldType = style({
  padding: "0.2rem 0.3rem",
  borderRadius: "0.5rem",
  backgroundColor: COLORS.GREY_CLEAR,
  color: COLORS.WHITE,
});
