import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const layout = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1rem",
    padding: "2rem 15vw 5rem 15vw",
  },
]);

export const container = style([
  s.flexColumn,
  {
    gap: "1rem",
    padding: "2rem 15vw 5rem 15vw",
  },
]);

export const settingOptionSection = style([
  s.border,
  s.flexColumn,
  { gap: "1.5rem", padding: "1.5rem 2rem", backgroundColor: colors.LAVENDER },
]);

export const sectionHead = style([s.flex, s.flexSpaceBetween]);

export const sectionTitle = style({
  fontWeight: 500,
  textTransform: "uppercase",
});

export const saveButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
]);

export const addDomainField = style([
  s.flex,
  s.flexSpaceBetween,
  {
    gap: "0.3rem",
    paddingBottom: "1rem",
    borderBottom: `1px solid ${colors.BLACK}`,
  },
]);

export const addButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
]);

export const domainList = style([
  s.flexColumn,
  {
    listStyle: "none",
    gap: "0.4rem",
  },
]);

export const domain = style([
  s.border,
  {
    backgroundColor: colors.BLACK,
    height: "2.5rem",
    lineHeight: "2.5rem",
    padding: "0 1.5rem",
    color: colors.WHITE,
    userSelect: "none",
  },
]);

export const deleteProjectSection = style({
  backgroundColor: colors.STRAWBERRY,
  gap: "1.5rem",
});

export const sectionDescription = style({
  fontSize: "0.9rem",
});

export const deleteProjectButton = style([
  s.button,
  s.buttonSize.small,
  {
    backgroundColor: "red",
    color: colors.WHITE,
  },
]);
