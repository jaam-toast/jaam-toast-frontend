import { keyframes, style } from "@vanilla-extract/css";
import { styleVariants } from "@vanilla-extract/css";
import * as colors from "../@config/colors";

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

export const boder = style({
  border: `1px solid ${colors.BLACK}`,
  borderRadius: "1.5rem",
});

const buttonIconPath = "/images/button-icon.svg";

export const button = style([
  flex,
  alignItemsCenter,
  poiner,
  {
    borderRadius: "5rem",
    textTransform: "uppercase",
    border: `1px solid ${colors.BLACK}`,
    "::after": {
      content: "",
      display: "block",
      width: "1rem",
      height: "1rem",
      marginLeft: "0.5rem",
      zoom: "75%",
      backgroundColor: "currentColor",
      WebkitMask: `url(${buttonIconPath}) no-repeat center`,
      mask: `url(${buttonIconPath}) no-repeat center`,
    },
  },
]);

export const buttonSize = styleVariants({
  small: {
    height: "2.5rem",
    padding: "0.7rem 1.1rem",
    fontSize: "0.8rem",
  },
  medium: {
    height: "3rem",
    padding: "0.7rem 1.4rem",
    fontSize: "0.9rem",
  },
  large: {
    height: "3rem",
    padding: "0.5rem 3rem",
    fontSize: "1.2rem",
    "::after": {
      zoom: "100%",
    },
  },
});

export const buttonColor = styleVariants({
  dark: {
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    ":hover": {
      backgroundColor: colors.WHITE,
      color: colors.BLACK,
    },
  },
  light: {
    backgroundColor: colors.WHITE,
    color: colors.BLACK,
    ":hover": {
      backgroundColor: colors.BLACK,
      color: colors.WHITE,
    },
  },
});

export const textField = style([
  fullWidth,
  {
    padding: "0.7rem 1.4rem",
    height: "3rem",
    fontSize: "0.9rem",
    border: `1px solid ${colors.BLACK}`,
    outline: "none",
    borderRadius: "5rem",
    flexShrink: 1,
  },
]);

const searchIconPath = "/images/search-icon.svg";

export const searchIcon = style({
  position: "relative",
  flexShrink: 1,
  "::after": {
    content: `url(${searchIconPath})`,
    position: "absolute",
    display: "inline",
    right: "1rem",
    width: "1.5rem",
    height: "1.5rem",
    zoom: "100%",
    fill: "currentColor",
  },
});

const apear = keyframes({
  "0%": { opacity: 0.5 },
  "100%": { opacity: 1 },
});

export const skeleton = style({
  borderRadius: "1.5rem",
  backgroundColor: colors.GREY_CLEAR,
  animation: `0.8s linear 0s infinite alternate none running ${apear}`,
});
