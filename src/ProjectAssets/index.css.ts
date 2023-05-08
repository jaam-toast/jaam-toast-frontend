import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const header = style([
  s.flex,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  s.fullWidth,
  {
    justifyContent: "flex-end",
    gap: "1rem",
    padding: "0.85rem 0 1.5rem 0",
  },
]);

export const headerDescription = style({ margin: "0.5rem 0 1rem 0" });

export const sectionDescription = style({
  fontSize: "0.9rem",
  lineHeight: "1.5rem",
});
export const newButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: COLORS.STRAWBERRY,
      borderColor: "none",
    },
  },
]);
