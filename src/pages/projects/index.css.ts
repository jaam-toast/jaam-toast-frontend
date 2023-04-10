import { style } from "@vanilla-extract/css";
import { s } from "../../styles";

const searchIcon = "/images/search-icon.svg";

export const container = style([
  s.full,
  {
    padding: "5rem 10vw 3rem",
  },
]);

export const explorerSection = style([
  s.flex,
  s.flexCenter,
  {
    gap: "0.5rem",
    marginBottom: "10rem",
  },
]);

export const searchInput = style([
  s.flex,
  s.alignItemsCenter,
  s.fullWidth,
  {
    position: "relative",
    flex: 1,
    "::after": {
      content: `url(${searchIcon})`,
      display: "inline",
      position: "absolute",
      right: "1rem",
      width: "1.5rem",
      height: "1.5rem",
      zoom: "100%",
      fill: "currentColor",
    },
  },
]);

export const newProjectButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
]);
