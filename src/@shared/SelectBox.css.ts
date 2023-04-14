import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.flex,
  s.alignItemsCenter,
  s.fullWidth,
  s.boder,
  s.poiner,
  {
    position: "relative",
    height: "3rem",
    fontSize: "0.9rem",
    background: colors.WHITE,
    userSelect: "none",
    zIndex: 99,
  },
]);

export const currentOption = style({
  position: "relative",
  display: "inline-block",
  padding: "0.7rem 1.4rem",
  zIndex: 999,
});

export const optionList = style([
  s.scroll,
  {
    width: "calc(100% + 2px)",
    maxHeight: "15rem",
    position: "absolute",
    top: "100%",
    left: -1,
    backgroundColor: colors.WHITE,
    listStyle: "none",
    border: `1px solid ${colors.BLACK}`,
    borderBottomLeftRadius: "1.5rem",
    borderBottomRightRadius: "1.5rem",
    borderTop: "none",
    zIndex: 99,
  },
]);

export const selectBoxDivider = style({
  position: "absolute",
  top: "50%",
  left: -1,
  width: "calc(100% + 2px)",
  height: "3rem",
  backgroundColor: colors.WHITE,
  borderRight: `1px solid ${colors.BLACK}`,
  borderLeft: `1px solid ${colors.BLACK}`,
  zIndex: 9,
});

export const option = style([
  {
    position: "relative",
    padding: "0.5rem 1.4rem",
    height: "3rem",
    lineHeight: "2rem",
    fontSize: "0.9rem",
    zIndex: 999,
    ":hover": {
      backgroundColor: colors.PAPER,
    },
    ":last-child": {
      paddingBottom: "2.8rem",
    },
  },
]);

export const selectBoxIcon = style({
  position: "absolute",
  right: "1rem",
  zIndex: 99,
});
