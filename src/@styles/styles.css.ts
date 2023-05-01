import { keyframes, style } from "@vanilla-extract/css";
import { styleVariants } from "@vanilla-extract/css";
import { COLORS } from "../@config/colors";

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

export const pointer = style({
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

export const border = style({
  border: `1px solid ${COLORS.BLACK}`,
  borderRadius: "1.5rem",
});

const buttonIconPath = "/images/button-icon.svg";

export const button = style([
  flex,
  alignItemsCenter,
  pointer,
  {
    borderRadius: "5rem",
    textTransform: "uppercase",
    border: `1px solid ${COLORS.BLACK}`,
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
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
    ":hover": {
      backgroundColor: COLORS.WHITE,
      color: COLORS.BLACK,
    },
  },
  light: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    ":hover": {
      backgroundColor: COLORS.BLACK,
      color: COLORS.WHITE,
    },
  },
});

export const textField = style([
  fullWidth,
  {
    padding: "0.7rem 1.4rem",
    height: "3rem",
    fontSize: "0.9rem",
    border: `1px solid ${COLORS.BLACK}`,
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

const appear = keyframes({
  "0%": { opacity: 0.5 },
  "100%": { opacity: 1 },
});

export const table = style([
  fullWidth,
  {
    marginTop: "1rem",
    borderCollapse: "collapse",
    borderSpacing: 0,
    fontSize: "0.95rem",
  },
]);

export const thCheckbox = style([
  {
    minWidth: "3px",
    maxWidth: "3px",
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

export const tbody = style([fullWidth]);

export const tableRow = style([
  { borderBottom: `1px solid ${COLORS.GREY_CLEAR}` },
]);

export const tableCell = style([{ maxWidth: "30rem", padding: "1rem" }]);

export const checkbox = style([{ textAlign: "center" }]);

export const skeleton = style({
  borderRadius: "1.5rem",
  backgroundColor: COLORS.GREY_CLEAR,
  animation: `0.8s linear 0s infinite alternate none running ${appear}`,
});
