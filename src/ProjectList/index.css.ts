import { style } from "@vanilla-extract/css";
import { s } from "../@styles";

export const container = style([
  s.fullWidth,
  {
    padding: "2rem 15vw 3rem",
  },
]);

export const explorerSection = style([
  s.flex,
  s.flexCenter,
  {
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
]);
export const searchInput = style([
  s.flex,
  s.alignItemsCenter,
  s.fullWidth,
  s.searchIcon,
  {
    flex: 1,
  },
]);

export const newProjectButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
]);
