import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([s.fullWidth, s.fullHeigth, { flex: 1 }]);

export const header = style([
  s.flex,
  s.fullWidth,
  {
    justifyContent: "flex-end",
    padding: "0.85rem 0 1.5rem 0",
  },
]);

export const newButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: COLORS.STRAWBERRY,
      borderColor: "none",
    },
  },
]);

export const inputContainer = style([
  s.flex,
  s.flexSpaceBetween,
  {
    borderTop: `1px solid ${COLORS.GREY_CLEAR}`,
    paddingTop: "1.5rem",
    gap: "1rem",
    marginBottom: "1rem",
  },
]);

export const sortOrderInputWrapper = style([s.flex, { gap: "0.5rem" }]);

export const schemaInputBox = style([
  {
    width: "20rem",
    height: "3rem",
  },
]);

export const sortOrderInputBox = style([
  {
    width: "14.8rem",
  },
]);

export const selectOptionField = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
  s.fullWidth,
  s.border,
  {
    padding: "0 1rem",
    height: "3rem",
    borderColor: COLORS.WHITE,
    color: COLORS.WHITE,
    backgroundColor: COLORS.LAVENDAR_DARK,
    fontSize: "0.9rem",
  },
]);

export const optionIcon = style([{ cursor: "pointer" }]);

export const schemaInputBoxSkeleton = style([s.skeleton, schemaInputBox]);

export const selectOptionFieldSkeleton = style([s.skeleton, selectOptionField]);
