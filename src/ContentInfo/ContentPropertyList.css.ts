import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const schemaNameSection = style([
  s.flexColumn,
  { gap: "1rem", minHeight: "10rem" },
]);

export const fieldHeader = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
]);

export const fieldTypeWrapper = style([s.flex, { gap: "1rem" }]);

export const fieldType = style({
  padding: "0.2rem 0.3rem",
  borderRadius: "0.5rem",
  backgroundColor: COLORS.GREY_CLEAR,
  color: COLORS.WHITE,
});

export const schemaNameSectionSkeleton = style([
  s.skeleton,
  schemaNameSection,
  { minHeight: "5rem" },
]);
