import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flexColumn,
  s.border,
  s.scroll,
  {
    margin: "1rem",
    padding: "2rem",
    width: "30rem",
    minHeight: "10rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const wrapper = style([
  s.scroll,
  { flex: 1, height: "100%", fontSize: "0.95rem" },
]);

export const warningMessage = style({
  padding: "0 1rem 1rem 1rem",
  fontSize: "0.8rem",
  color: COLORS.RED,
});

export const buttonWrapper = style([
  s.flex,
  s.flexSpaceBetween,
  {
    flexDirection: "row-reverse",
    position: "sticky",
    bottom: 0,
    padding: "1rem 0 0 0",
    backgroundColor: "inherit",
  },
]);

export const sectionHeader = style({ marginBottom: "2rem" });

export const sectionDescription = style({
  lineHeight: "1.5rem",
  color: COLORS.RED,
});

export const sectionForm = style([
  s.flexColumn,
  { gap: "0.5rem", margin: "2rem 0 0 0" },
]);

export const sectionLabel = style({
  color: COLORS.GREY,

  ":valid": { display: "hide" },
});

export const sectionLabelPoint = style({ textDecoration: "underline" });

export const sectionCancelButton = style([
  s.button,
  s.buttonColor.dark,
  s.buttonSize.small,
]);

export const sectionDeleteButton = style([
  s.button,
  s.buttonSize.small,
  {
    backgroundColor: "red",
    color: COLORS.WHITE,
  },
]);
