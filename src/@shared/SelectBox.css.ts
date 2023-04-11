import { style } from "@vanilla-extract/css";
import { s } from "src/styles";
import * as colors from "../config/colors";

export const container = style([
  s.flex,
  s.alignItemsCenter,
  s.fullWidth,
  s.boder,
  s.poiner,
  {
    position: "relative",
    background: colors.WHITE,
    zIndex: 99,
    userSelect: "none",
  },
]);

export const currentOption = style({
  display: "inline-block",
  position: "relative",
  zIndex: 999,
  padding: "0.5rem 2rem",
});

export const optionList = style([
  s.boder,
  {
    width: "calc(100% + 2px)",
    position: "absolute",
    top: "100%",
    left: -1,
    backgroundColor: colors.WHITE,
    listStyle: "none",
    borderTop: "none",
    zIndex: 99,
    "::after": {
      content: "",
      backgroundColor: colors.WHITE,
      position: "absolute",
      width: "100%",
      height: "3rem",
      top: "calc(-50% + 1.5rem)",
      borderRight: `1px solid ${colors.BLACK}`,
      borderLeft: `1px solid ${colors.BLACK}`,
      left: -1,
      zIndex: 0,
    },
  },
]);

export const option = style([
  {
    position: "relative",
    padding: "0.5rem 2rem",
    height: "3rem",
    zIndex: 999,
    lineHeight: "2rem",
    fontSize: "0.9rem",
    ":hover": {
      backgroundColor: colors.PAPER,
    },
    ":last-child": {
      borderBottomRightRadius: "1.5rem",
      borderBottomLeftRadius: "1.5rem",
      paddingBottom: "2.8rem",
    },
  },
]);

export const selectBoxIcon = style({
  position: "absolute",
  right: "1rem",
  zIndex: 99,
});
