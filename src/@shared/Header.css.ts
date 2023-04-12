import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { gmarketSans } from "src/@styles/font.css";

export const container = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
  s.fullWidth,
  {
    height: "10vh",
    padding: "0 10vw",
    flexShrink: 0,
  },
]);

export const logo = style({
  fontSize: "1.5rem",
  fontFamily: gmarketSans,
  letterSpacing: "-2px",
  userSelect: "none",
  cursor: "pointer",
});

export const logoutButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.light,
]);
