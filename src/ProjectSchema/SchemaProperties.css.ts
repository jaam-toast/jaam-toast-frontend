import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const fieldList = style([s.flexColumn, { gap: "1rem" }]);

export const field = style([
  s.flex,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  s.fullWidth,
  s.border,
  { gap: "1rem", padding: "1rem", borderColor: colors.GREY_CLEAR },
]);

export const fieldTypeIcon = style({ maxWidth: "3rem" });

export const fieldInfoWrapper = style([
  s.flexColumn,
  { gap: "0.3rem", width: "100%" },
]);

export const fieldInfo = style([s.flex, { gap: "1rem", color: colors.GREY }]);

export const fieldEditButtons = style([s.flex, { gap: "1rem" }]);

export const fieldEditButton = style([s.pointer]);
