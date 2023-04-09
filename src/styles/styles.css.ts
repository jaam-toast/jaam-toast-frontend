import { style } from "@vanilla-extract/css";
import { styleVariants } from "@vanilla-extract/css";
import * as colors from "../config/colors";

export const flex = style({
  display: "flex",
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
});

export const flexCenter = style({
  alignItems: "center",
  justifyContent: "center",
});

export const alignItemsCenter = style({
  alignItems: "center",
});

export const justifyContentCenter = style({
  justifyContent: "center",
});

export const flexSpaceBetween = style({
  justifyContent: "space-between",
});

export const full = style({
  width: "100%",
  height: "100%",
});

export const fullWidth = style({
  width: "100%",
});

export const fullHeigth = style({
  height: "100%",
});

export const poiner = style({
  cursor: "pointer",
});

export const button = style({
  borderRadius: "5rem",
  border: 0,
  textTransform: "uppercase",
});

export const buttonSize = styleVariants({
  small: {
    height: "2.8rem",
    padding: "0.7rem 1.2rem",
    fontSize: "0.9rem",
  },
  large: {
    height: "4rem",
    padding: "0.5rem 3rem",
    fontSize: "1.1rem",
  },
});

export const buttonColor = styleVariants({
  dark: {
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    border: `1px solid ${colors.WHITE}`,
    ":hover": {
      backgroundColor: colors.WHITE,
      color: colors.BLACK,
      border: `1px solid ${colors.BLACK}`,
    },
  },
  light: {
    backgroundColor: colors.WHITE,
    color: colors.BLACK,
    border: `1px solid ${colors.BLACK}`,
    ":hover": {
      backgroundColor: colors.BLACK,
      color: colors.WHITE,
      border: `1px solid ${colors.WHITE}`,
    },
  },
});
