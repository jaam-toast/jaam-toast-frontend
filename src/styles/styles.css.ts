import { style } from "@vanilla-extract/css";
import { styleVariants } from "@vanilla-extract/css";
import * as colors from "../config/colors";

export const flex = style({
  display: "flex",
});

export const inlineFlex = style({
  display: "inline-flex",
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

export const scroll = style({
  overflow: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const button = style([
  flex,
  alignItemsCenter,
  poiner,
  {
    borderRadius: "5rem",
    border: 0,
    textTransform: "uppercase",
    "::after": {
      content: "",
      display: "block",
      width: "1rem",
      height: "1rem",
      marginLeft: "0.5rem",
      zoom: "75%",
      backgroundColor: "currentColor",
      WebkitMask: `url(/images/button-icon.svg) no-repeat center`,
      mask: `url("/images/button-icon.svg") no-repeat center`,
    },
  },
]);

export const buttonSize = styleVariants({
  small: {
    height: "3rem",
    padding: "0.7rem 1.4rem",
    fontSize: "0.8rem",
  },
  large: {
    height: "3rem",
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

export const textField = style([
  fullWidth,
  {
    padding: "0.7rem 1.4rem",
    height: "3rem",
    fontSize: "0.8rem",
    border: `1px solid ${colors.BLACK}`,
    outline: "none",
    borderRadius: "5rem",
    flex: 1,
    "::placeholder": {
      color: colors.BLACK,
      textTransform: "uppercase",
    },
    "::-moz-placeholder": {
      color: colors.BLACK,
      textTransform: "uppercase",
    },
    "::-webkit-input-placeholder": {
      color: colors.BLACK,
      textTransform: "uppercase",
    },
  },
]);
