import { style, styleVariants } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flexColumn,
  s.alignItemsCenter,
  s.border,
  {
    gap: "1.5rem",
    borderRadius: "0.5rem",
    top: 0,
    left: 0,
    marginTop: "1rem",
    width: "30rem",
    height: "10rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const wrapper = style([
  s.flexColumn,
  s.justifyContentCenter,
  s.alignItemsCenter,
  s.full,
  {
    gap: "1rem",
    padding: "2rem",
  },
]);

export const messageWrapper = style([
  s.flexColumn,
  s.full,
]);

export const typeBox = style({ marginTop: "1rem" });

export const message = style([
  s.flex,
  s.full,
  {
    marginTop: "1rem",
  },
]);

export const buttonWrapper = style([
  s.flex,
  s.full,
  {
    justifyContent: "flex-end",
    gap: "1rem",
  },
]);

export const button = style([
  s.pointer,
  {
    height: "2.5rem",
    padding: "0.7rem 1.1rem",
    fontSize: "0.8rem",
    borderRadius: "0.5rem",
    textTransform: "uppercase",
    border: `1px solid ${COLORS.GREY_CLEAR}`,
    backgroundColor: COLORS.WHITE,

    ":hover": {
      backgroundColor: COLORS.GREY_LIGHT,
    },
  },
]);

export const deleteButton = style({
  backgroundColor: COLORS.RED_DARK,
  color: COLORS.WHITE,

  ":hover": {
    borderColor: COLORS.RED,
    backgroundColor: COLORS.RED,
  },
});

export const hide = style({ display: "none" });
