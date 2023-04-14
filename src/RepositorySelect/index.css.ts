import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.flexColumn,
  s.fullHeigth,
  {
    gap: "1rem",
    padding: "2rem 15vw",
  },
]);

export const titleSection = style([s.flexColumn, { gap: "0.5rem" }]);

export const mainTitle = style({
  fontSize: "2rem",
});

export const subTitle = style({
  fontSize: "1rem",
});

export const repositorySection = style([
  s.flexColumn,
  s.fullHeigth,
  {
    gap: "0.5rem",
    border: `1px solid ${colors.BLACK}`,
    borderRadius: "1.5rem",
    padding: "2rem 3rem",
    backgroundColor: colors.LAVENDER,
  },
]);

export const searchConsole = style([s.flex, { gap: "0.5rem" }]);

export const textFieldSection = style({ width: "40%" });

export const selectMessage = style([
  s.flex,
  s.flexCenter,
  s.fullWidth,
  s.boder,
  {
    height: "18.5rem",
    backgroundColor: colors.WHITE,
    fontSize: "1.1rem",
    fontWeight: 300,
  },
]);
