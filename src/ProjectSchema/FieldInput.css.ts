import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const fieldNameSection = style([s.flexColumn]);

export const fieldNameWrapper = style([
  s.flex,
  s.alignItemsCenter,
  {
    justifyContent: "flex-end",
    height: "3rem",
    marginBottom: "1rem",
  },
]);

export const fieldNameInput = style([
  {
    position: "relative",
    borderRadius: "1.5rem",
    border: "1px solid black",
    width: "100%",
    height: "3rem",
    padding: "0 2rem",
    fontSize: "1rem",
  },
]);

export const warningMessage = style({
  minHeight: "1.5rem",
  maxHeight: "1.5rem",
  padding: "0 1rem",
  fontSize: "0.8rem",
  color: COLORS.RED,
});

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

export const typeButton = style([
  s.inlineFlex,
  s.pointer,
  {
    position: "absolute",
    paddingRight: "4.5rem",
  },
]);
