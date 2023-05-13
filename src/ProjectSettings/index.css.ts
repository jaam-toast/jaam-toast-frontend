import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

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
  {
    gap: "0.8rem",
    padding: "1.5rem 2rem",
    minHeight: "9rem",
    backgroundColor: COLORS.LAVENDER,
  },
]);

export const commandOptionSection = style([
  settingOptionSection,
  {
    gap: "0.5rem",
  },
]);

export const sectionHead = style([s.flex, s.flexSpaceBetween]);

export const sectionTitle = style({
  fontWeight: 500,
  textTransform: "uppercase",
});

/**
 * button
 */

const disabledButton = style({
  ":disabled": {
    cursor: "not-allowed",
  },
});

export const addButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  disabledButton,
]);

export const saveButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
  disabledButton,
]);

export const deleteButton = style([
  s.button,
  s.buttonSize.small,
  {
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE,

    ":hover": {
      backgroundColor: COLORS.WHITE,
      color: COLORS.RED,
      fontWeight: 700,
      borderColor: COLORS.RED,
    },
  },
]);

export const baseMessage = style({ fontSize: "0.8rem", minHeight: "1rem" });

export const warningMessage = style([
  baseMessage,
  {
    color: COLORS.RED,
  },
]);

export const sectionDescription = style({
  fontSize: "0.9rem",
  lineHeight: "1.5rem",
});

export const sectionDescriptionHighlight = style({
  padding: "0.2rem 0.3rem",
  border: `2px solid ${COLORS.RED}`,
  borderRadius: "0.5rem",
  fontWeight: 500,
});

export const settingOptionSectionSkeleton = style([
  s.skeleton,
  settingOptionSection,
  { backgroundColor: COLORS.GREY_CLEAR, border: "none" },
]);

export const deleteProjectSection = style({
  backgroundColor: COLORS.STRAWBERRY,
  gap: "1.5rem",
});

export const sectionOptionWrapper = style([
  s.flex,
  s.flexSpaceBetween,
  {
    gap: "0.3rem",
    paddingBottom: "1rem",
    borderBottom: `1px solid ${COLORS.BLACK}`,
  },
]);

export const domainList = style([
  s.flexColumn,
  {
    listStyle: "none",
    gap: "0.4rem",
  },
]);

export const domainWrapper = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
  { gap: "1rem" },
]);

export const domain = style([
  s.flex,
  s.alignItemsCenter,
  s.border,
  s.full,
  {
    padding: "0.5rem 1.4rem",
    height: "3rem",
    lineHeight: "2.5rem",
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
    userSelect: "none",
  },
]);
