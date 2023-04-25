import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const addEnvSection = style([s.flex, { gap: "0.3rem" }]);

export const addEnvKey = style({
  width: "25%",
});

export const addEnvValue = style([
  s.flex,
  {
    gap: "0.3rem",
    width: "100%",
  },
]);

export const addEnvButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
]);

export const envList = style([
  s.flexColumn,
  {
    marginBottom: "0.7rem",
    gap: "0.3rem",
  },
]);

export const envKey = style([
  s.border,
  {
    padding: "0.7rem 2rem",
    width: "25%",
    height: "3rem",
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
    fontSize: "1.1rem",
  },
]);

export const envValue = style([
  s.border,
  {
    padding: "0.7rem 2rem",
    width: "100%",
    height: "3rem",
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
    fontSize: "1.1rem",
  },
]);

export const removeEnvButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.light,
  { fontSize: "0.8rem", padding: "0.7rem" },
]);
