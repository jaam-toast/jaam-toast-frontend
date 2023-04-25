import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flexColumn,
  {
    gap: "2rem",
    paddingBottom: "1.5rem",
  },
]);

export const projectTitle = style({
  fontSize: "2rem",
});

export const navBar = style([
  s.flex,
  {
    gap: "0.5rem",
    listStyle: "none",
  },
]);

export const navLinkPoint = style([
  s.border,
  {
    backgroundColor: COLORS.MINT,
    padding: "0.6rem 1.5rem",
    fontWeight: 500,
    fontSize: "0.8rem",
    cursor: "pointer",
  },
]);

export const navLink = style([
  s.border,
  {
    backgroundColor: COLORS.WHITE,
    padding: "0.6rem 1.5rem",
    fontWeight: 500,
    fontSize: "0.8rem",
    cursor: "pointer",
    ":hover": {
      backgroundColor: COLORS.LEMON,
    },
  },
]);
