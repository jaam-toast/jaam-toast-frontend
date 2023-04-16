import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

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

export const dashboardNavBar = style([
  s.flex,
  { gap: "0.5rem", listStyle: "none" },
]);

export const dashboardNavLink = style([
  s.border,
  {
    backgroundColor: colors.WHITE,
    padding: "0.6rem 1.5rem",
    fontWeight: 500,
    fontSize: "0.8rem",
  },
]);
