import { style } from "@vanilla-extract/css";
import { s } from "src/@styles";

export const container = style([
  s.full,
  s.flexColumn,
  s.flexCenter,
  { gap: "1rem" },
]);

export const errorCode = style({
  fontSize: "10rem",
});

export const errorMessage = style({
  fontSize: "1.2rem",
  textAlign: "center",
  lineHeight: "2rem",
});

export const buttonConsole = style([s.flex, { gap: "0.5rem" }]);

export const navigateButton = style([
  s.button,
  s.buttonColor.light,
  s.buttonSize.medium,
  {
    fontSize: "1rem",
  },
]);
