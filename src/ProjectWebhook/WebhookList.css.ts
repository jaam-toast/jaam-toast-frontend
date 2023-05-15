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

export const cellBox = style([
  s.scroll,
  { padding: "1rem 1rem 1rem 0", overflow: "scroll" },
]);

export const nameCell = style([s.scroll, { maxWidth: "5rem" }]);

export const urlCell = style({ maxWidth: "10rem" });

export const eventsCell = style({ maxWidth: "10rem" });

export const eventsBox = style([
  cellBox,
  {
    lineHeight: 2.5,
  },
]);
