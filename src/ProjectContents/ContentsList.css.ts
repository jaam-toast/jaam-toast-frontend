import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const selectOptionField = style([
  s.flex,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  s.fullWidth,
  s.border,
  {
    height: "3rem",
    borderColor: COLORS.WHITE,
    color: COLORS.WHITE,
    backgroundColor: COLORS.LAVENDAR_DARK,
    fontSize: "0.9rem",
  },
]);

export const optionIcon = style([{ cursor: "pointer" }]);

/**
 * table
 */
export const table = style([s.table]);
export const thCheckbox = style([s.thCheckbox]);
export const th = style([s.th]);
export const tbody = style([s.tbody]);
export const row = style([s.tableRow]);
export const cell = style([s.tableCell]);
export const checkboxField = style([s.checkbox]);

export const nameField = style([
  s.inlineFlex,
  {
    boxSizing: "border-box",
    alignItems: "center",
    gap: "1rem",
    fontWeight: 500,
    cursor: "pointer",
  },
]);
export const typeField = style([
  s.inlineFlex,
  {
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    overflow: "auto",
    color: COLORS.GREY,
  },
]);
export const type = style([
  {
    padding: "0.5rem",
    borderRadius: "0.4rem",
    backgroundColor: COLORS.GREY_LIGHT,
    border: `1px solid ${COLORS.GREY_CLEAR}`,
  },
]);
