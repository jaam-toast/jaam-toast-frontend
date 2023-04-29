import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const selectOptionField = style([
  s.flex,
  s.flexSpaceBetween,
  s.fullWidth,
  s.border,
  {
    padding: "1rem",
    borderColor: COLORS.WHITE,
    color: COLORS.WHITE,
    backgroundColor: COLORS.LAVENDAR_DARK,
    fontSize: "0.9rem",
  },
]);

export const optionIcon = style([{ cursor: "pointer" }]);

export const table = style([
  s.fullWidth,
  {
    marginTop: "1rem",
    borderCollapse: "collapse",
    borderSpacing: 0,
    fontSize: "0.95rem",
  },
]);

export const thCheckbox = style([
  {
    maxWidth: "10px",
  },
]);

export const th = style([
  {
    padding: "1rem",
    fontWeight: 300,
    textAlign: "left",
    color: COLORS.GREY,
  },
]);

export const tbody = style([s.fullWidth]);

export const row = style([{ borderBottom: `1px solid ${COLORS.GREY_CLEAR}` }]);

export const cell = style([{ maxWidth: "30rem", padding: "1rem" }]);

export const checkboxField = style([{ textAlign: "center" }]);
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
