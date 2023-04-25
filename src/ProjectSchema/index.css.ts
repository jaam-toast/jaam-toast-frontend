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

export const selectOptionField = style([
  s.flex,
  s.flexSpaceBetween,
  s.fullWidth,
  s.border,
  {
    padding: "1rem",
    borderColor: colors.COLOR.WHITE,
    color: colors.COLOR.WHITE,
    backgroundColor: colors.COLOR.LAVENDAR_DARK,
    fontSize: "0.9rem",
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

export const optionField = style([
  s.flex,
  { gap: "1rem", justifyContent: "flex-end" },
]);
export const optionIcon = style([{ cursor: "pointer" }]);

export const fieldNameSection = style([s.flexColumn]);

export const fieldNameWrapper = style([
  s.flex,
  s.alignItemsCenter,
  {
    justifyContent: "flex-end",
    // height: "3rem",
    marginBottom: "1rem",
  },
]);

export const addButton = style([
  s.buttonColor.dark,
  s.pointer,
  {
    position: "absolute",
    padding: "0 1rem",
    borderRadius: "0 1.5rem 1.5rem 0",
    border: "1px solid black",
    height: "inherit",
    zIndex: 1,
  },
]);

export const typeButton = style([
  // s.inlineFlex,
  s.pointer,
  {
    // position: "absolute",
    width: "10rem",
  },
]);
