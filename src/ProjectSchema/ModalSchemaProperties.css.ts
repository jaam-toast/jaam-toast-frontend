import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLOR } from "../@config/colors";
import * as colors from "../@config/colors";

export const container = style([
  s.flexColumn,
  s.border,
  s.scroll,
  {
    margin: "1rem",
    padding: "2rem",
    width: "30rem",
    minHeight: "40rem",
    maxHeight: "40rem",
    backgroundColor: colors.WHITE,
  },
]);

export const header = style([
  s.flexColumn,
  {
    position: "sticky",
    top: 0,
    // padding: "2rem 0",
    backgroundColor: "inherit",
    fontWeight: 400,
  },
]);

export const headerFirstLine = style([
  s.flex,
  s.flexSpaceBetween,
  { paddingBottom: "3rem" },
]);

export const schemaName = style({ color: COLOR.LAVENDAR_DARK });

export const wrapper = style([
  s.scroll,
  { flex: 1, height: "100%", paddingBottom: "3rem", fontSize: "0.95rem" },
]);

export const footer = style([
  s.flex,
  s.flexSpaceBetween,
  {
    flexDirection: "row-reverse",
    position: "sticky",
    bottom: 0,
    padding: "1rem 0",
    backgroundColor: "inherit",
  },
]);

/**
 * field title
 */
export const fieldTitleBox = style([
  {
    padding: "1rem 0 0.5rem 0",
    marginBottom: "1rem",
    borderBottom: `2px solid ${colors.GREY_CLEAR}`,
  },
]);

export const fieldTitle = style([
  {
    padding: "1rem 0 0.48rem 0",
    marginBottom: "50px",
    borderBottom: `3px solid ${colors.RED_LIGHT}`,
    width: "fit-content",
    fontWeight: 450,
  },
]);

export const fieldSubText = style([
  {
    paddingTop: "1rem",
    fontSize: "0.9rem",
    color: COLOR.GREY,
  },
]);

/**
 * schema field list
 */
export const fieldList = style([s.flexColumn, { gap: "1rem" }]);
export const field = style([
  s.flex,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  s.fullWidth,
  s.border,
  { gap: "1rem", padding: "1rem", borderColor: colors.GREY_CLEAR },
]);
export const fieldTypeIcon = style({ maxWidth: "3rem" });
export const fieldInfoWrapper = style([
  s.flexColumn,
  { gap: "0.3rem", width: "100%" },
]);
export const fieldInfo = style([s.flex, { gap: "1rem", color: colors.GREY }]);
export const fieldEditButtons = style([s.flex, { gap: "1rem" }]);
export const fieldEditButton = style([s.pointer]);

/**
 * button
 */
export const saveButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.light,
]);

export const disable = style({
  backgroundColor: COLOR.GREY_CLEAR,
  color: COLOR.GREY,
  border: "none",
  cursor: "not-allowed",
});
