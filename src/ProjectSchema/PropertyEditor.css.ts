import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";
import { COLOR } from "../@config/colors";

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
    borderColor: colors.WHITE,
    minWidth: "7rem",
    maxWidth: "7rem",
    padding: "1rem 0",
    gap: "1rem",
    fontSize: "0.8rem",
    ":hover": {
      backgroundColor: colors.GREY_LIGHT,
    },
  },
]);
export const type = style({ backgroundColor: COLOR.GREY_LIGHT });

/**
 * schema field option section
 */
export const optionFieldList = style([
  s.flexColumn,
  {
    gap: "0.8rem",
    padding: "0 1rem",
    listStyle: "none",
  },
]);
export const optionFieldLabel = style([
  {
    paddingLeft: "1rem",
  },
]);