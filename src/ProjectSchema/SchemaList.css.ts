import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

/**
 * table
 */
export const table = style([s.table]);
export const th = style([s.th]);
export const tbody = style([s.tbody]);
export const row = style([s.tableRow]);
export const cell = style([s.tableCell]);
export const checkboxField = style([s.tdCheckbox]);

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

export const schemaName = style({
  ":hover": {
    borderBottom: `1px solid ${COLORS.BLACK}`,
  },
});

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

export const optionCell = style([s.tableOptionCell]);

export const optionField = style([
  s.flex,
  s.justifyContentCenter,
  { gap: "1rem" },
]);

export const optionIcon = style([{ cursor: "pointer" }]);

export const cellSkeleton = style([
  cell,
  { width: "27rem", paddingLeft: "3.9rem" },
]);

export const textSkeleton = style([
  s.skeleton,
  {
    borderRadius: "1.5rem",
    width: "10rem",
    height: "2rem",
  },
]);
