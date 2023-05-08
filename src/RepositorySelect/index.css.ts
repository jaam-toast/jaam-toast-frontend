import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

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
    border: `1px solid ${COLORS.BLACK}`,
    borderRadius: "1.5rem",
    padding: "2rem 3rem",
    backgroundColor: COLORS.LAVENDER,
  },
]);

export const searchConsole = style([
  s.flex,
  s.searchIcon,
  s.alignItemsCenter,
  { gap: "0.5rem" },
]);

export const textFieldSection = style({ width: "40%" });

export const githubSettingMessage = style([
  s.flex,
  s.flexCenter,
  s.full,
  s.border,
  {
    border: "none",
    backgroundColor: COLORS.WHITE,
    fontSize: "1.1rem",
    fontWeight: 300,
  },
]);

export const selectMessage = style([
  s.flex,
  s.flexCenter,
  s.full,
  s.border,
  {
    backgroundColor: COLORS.WHITE,
    fontSize: "1.1rem",
    fontWeight: 300,
  },
]);
