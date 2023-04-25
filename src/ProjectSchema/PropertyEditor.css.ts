import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const typeList = style([
  s.justifyContentCenter,
  {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
]);
export const typeWrapper = style([
  s.flexColumn,
  s.alignItemsCenter,
  s.border,
  s.pointer,
  {
    borderColor: COLORS.WHITE,
    minWidth: "7rem",
    maxWidth: "7rem",
    padding: "1rem 0",
    gap: "1rem",
    fontSize: "0.8rem",
    ":hover": {
      backgroundColor: COLORS.GREY_LIGHT,
    },
  },
]);
export const type = style({ backgroundColor: COLORS.GREY_LIGHT });

/**
 * schema field option section
 */
export const optionFieldList = style([
  s.flexColumn,
  {
    gap: "0.8rem",
    // padding: "0 1rem",
    listStyle: "none",
  },
]);

export const optionField = style([
  s.flex,
  s.alignItemsCenter,
  s.border,
  {
    borderColor: COLORS.GREY_CLEAR,
    gap: "1rem",
    padding: "1rem",
    minHeight: "3rem",
  },
]);

export const optionCheckField = style([optionField]);

export const optionInputField = style([
  optionField,
  {
    borderRadius: "3rem",
    padding: "1rem 1rem 1rem 3rem",
  },
]);

export const optionInput = style([s.textField]);

export const fieldSubText = style([
  {
    paddingTop: "1rem",
    fontSize: "0.9rem",
    color: COLORS.GREY,
  },
]);
