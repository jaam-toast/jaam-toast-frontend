import { style } from "@vanilla-extract/css";
import { s } from "../@styles";

/**
 * table
 */
export const table = style([s.table]);
export const th = style([s.th]);
export const tbody = style([s.tbody]);
export const row = style([s.tableRow]);
export const cell = style([s.tableCell]);
export const checkboxField = style([s.tdCheckbox]);

export const optionBox = style([
  s.flex,
  s.justifyContentCenter,
  { gap: "1rem" },
]);

export const optionCell = style([s.tableOptionCell]);

export const optionIcon = style([{ cursor: "pointer" }]);
