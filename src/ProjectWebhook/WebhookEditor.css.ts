import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

// export const container = style([s.fullWidth, s.fullHeigth, { flex: 1 }]);

// export const header = style([
//   s.flex,
//   s.flexSpaceBetween,
//   s.fullWidth,
//   {
//     paddingBottom: "1.5rem",
//   },
// ]);

// export const button = style([s.button, s.buttonSize.medium]);

// export const prevButton = style([
//   s.buttonColor.light,
//   {
//     ":hover": {
//       backgroundColor: COLORS.STRAWBERRY,
//       borderColor: "none",
//     },
//   },
// ]);

// export const saveButton = style([
//   s.buttonColor.dark,
//   {
//     ":hover": {
//       backgroundColor: COLORS.STRAWBERRY,
//       borderColor: "none",
//     },
//   },
// ]);

export const sectionContainer = style([
  s.flexColumn,
  s.border,
  {
    padding: "2rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const sectionHeaderTitle = style([
  s.flexColumn,
  s.fullWidth,
  {
    position: "sticky",
    zIndex: 10,
    top: 0,
    left: 0,
    padding: "2rem 0",
    backgroundColor: COLORS.WHITE,
    fontWeight: 400,
  },
]);

export const sectionWrapper = style([s.flexColumn, { gap: "3rem" }]);

export const sectionFieldWrapper = style([s.flexColumn]);

export const warningMessage = style({
  padding: "0 1rem 1rem 1rem",
  fontSize: "0.8rem",
  color: COLORS.RED,
});

/**
 * table
 */
export const table = style([s.table]);
export const th = style([s.th]);
export const checkboxHeader = style({ width: "50%", textAlign: "center" });
export const nameHeader = style({ paddingLeft: "10rem" });
export const tbody = style([s.tbody]);
export const row = style([s.tableRow]);
export const cell = style([s.tableCell, { paddingLeft: "10rem" }]);
export const checkboxField = style([s.tdCheckbox]);
export const checkboxContainer = style([
  s.flex,
  s.justifyContentCenter,
  s.alignItemsCenter,
  s.full,
]);

export const checkboxWrapper = style({
  width: "20px",
});
