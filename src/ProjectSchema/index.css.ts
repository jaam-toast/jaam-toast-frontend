import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const layout = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1rem",
    padding: "2rem 15vw 5rem 15vw",
  },
]);

export const container = style([s.fullWidth, s.fullHeigth, { flex: 1 }]);

export const header = style([
  s.flex,
  s.fullWidth,
  {
    justifyContent: "flex-end",
    marginBottom: "1rem",
  },
]);

export const searchInput = style([
  s.flex,
  s.alignItemsCenter,
  s.fullWidth,
  s.searchIcon,
  {
    flex: 1,
  },
]);

export const newButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: colors.STRAWBERRY,
      borderColor: "none",
    },
  },
]);

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
    color: colors.GREY,
  },
]);

export const row = style([{ borderBottom: `1px solid ${colors.GREY_CLEAR}` }]);

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
    color: colors.GREY,
  },
]);
export const type = style([
  {
    padding: "0.5rem",
    borderRadius: "0.4rem",
    backgroundColor: colors.GREY_LIGHT,
    border: `1px solid ${colors.GREY_CLEAR}`,
  },
]);

export const optionField = style([s.flex, { gap: "1rem" }]);
export const optionIcon = style([{ cursor: "pointer" }]);
