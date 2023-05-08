import { s } from "../@styles";
import { COLORS } from "../@config/colors";
import { style } from "@vanilla-extract/css";

const container = style([
  s.border,
  s.flexColumn,
  {
    flex: "60%",
    padding: "2rem 3rem 2rem",
    gap: "2rem",
    width: "90%",
    minHeight: "25rem",
    listStyle: "none",
    borderColor: COLORS.GREY_CLEAR,
  },
]);

export const infoText = style({
  fontSize: "0.95rem",
  fontWeight: 500,
});

export const emptyCmsSection = style([
  container,
  s.flexCenter,
  {
    borderStyle: "dashed",
    userSelect: "none",
  },
]);

export const emptyCmsButtonWrapper = style([
  s.flex,
  {
    gap: "2rem",
  },
]);

export const emptyCmsButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: COLORS.LAVENDER,
    },
  },
]);
