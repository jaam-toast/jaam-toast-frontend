import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flex,
  s.alignItemsCenter,
  s.fullWidth,
  s.border,
  s.pointer,
  {
    position: "relative",
    height: "3rem",
    fontSize: "0.9rem",
    background: COLORS.WHITE,
    userSelect: "none",
  },
]);

export const label = style({
  zIndex: 9,
  paddingLeft: "1.5rem",
  fontSize: "0.8rem",
});

export const currentOption = style({
  position: "relative",
  display: "inline-block",
  padding: "0.7rem 1.4rem",
  zIndex: 9,
});

export const optionList = style([
  s.scroll,
  {
    position: "absolute",
    top: "100%",
    left: -1,
    width: "calc(100% + 2px)",
    maxHeight: "15rem",
    backgroundColor: COLORS.WHITE,
    listStyle: "none",
    border: `1px solid ${COLORS.BLACK}`,
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
  backgroundColor: COLORS.WHITE,
  borderRight: `1px solid ${COLORS.BLACK}`,
  borderLeft: `1px solid ${COLORS.BLACK}`,
});

export const option = style([
  {
    padding: "0.5rem 1.4rem",
    height: "3rem",
    lineHeight: "2rem",
    fontSize: "0.9rem",
    ":hover": {
      backgroundColor: COLORS.PAPER,
    },
    ":last-child": {
      paddingBottom: "2.8rem",
    },
  },
]);

export const highlight = style({ color: COLORS.STRAWBERRY });

export const selectBoxIcon = style({
  position: "absolute",
  right: "1rem",
  zIndex: 9,
});
