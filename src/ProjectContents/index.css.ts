import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const layout = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1rem",
    padding: "2rem 15vw 5rem 15vw",
    fontSize: "0.9rem",
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

export const newButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: COLORS.STRAWBERRY,
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
    borderColor: COLORS.WHITE,
    color: COLORS.WHITE,
    backgroundColor: COLORS.LAVENDAR_DARK,
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

//

export const searchInputWrapper = style([
  s.flex,
  s.fullWidth,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  {
    gap: "0.5rem",
    justifyContent: "flex-end",
    position: "relative",
  },
]);

// export const sortFilterBox = style([
//   s.flex,
//   s.flexCenter,
//   s.border,
//   {
//     position: "absolute",
//     height: "80%",
//     borderRight: "none",
//     borderColor: COLORS.GREY_CLEAR,
//     // borderStyle: "dashed",
//     zIndex: 1,
//     fontSize: "0.8rem",
//     color: COLORS.GREY,
//     ":hover": {
//       borderStyle: "groove",
//     },
//   },
// ]);

export const filterInputBox = style([
  // s.flex,
  // s.flexCenter,
  s.pointer,
  // s.border,
  {
    zIndex: 1,
    width: "20rem",
    // padding: "0 1rem",
    height: "3rem",
    // backgroundColor: COLORS.WHITE,
    ":hover": {
      color: COLORS.BLACK,
    },
    // border: "1px solid black",
  },
]);

export const sortInputBox = style([
  s.flex,
  s.flexCenter,
  s.pointer,
  // s.border,
  {
    // borderColor: COLORS.GREY_LIGHT,
    height: "2.5rem",
    position: "relative",
    width: "15rem",
  },
]);

export const filterBox = style([
  s.flexColumn,
  s.border,
  {
    gap: "1rem",
    marginTop: "1rem",
    padding: "1rem 1.5rem",
    minHeight: "3rem",
    height: "100%",
    // borderStyle: "dashed",
    borderColor: COLORS.GREY_CLEAR,
    backgroundColor: COLORS.WHITE,
  },
]);

export const filterBoxHeader = style([s.flex, s.flexSpaceBetween]);

export const filterContentWrapper = style([s.flex, { gap: "1rem" }]);

export const filterContent = style([
  s.flex,
  s.flexCenter,
  {
    gap: "0.5rem",
    padding: "0.5rem",
    borderRadius: "0.4rem",
    backgroundColor: COLORS.GREY_LIGHT,
    border: `1px solid ${COLORS.GREY_CLEAR}`,
    borderStyle: "dashed",
    fontSize: "0.9rem",
  },
]);

export const filterCloseIcon = style([s.pointer, { color: COLORS.GREY }]);
