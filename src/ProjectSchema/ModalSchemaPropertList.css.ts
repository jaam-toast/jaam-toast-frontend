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
    minHeight: "40rem",
    maxHeight: "40rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const header = style([
  s.flexColumn,
  {
    position: "sticky",
    top: 0,
    paddingBottom: "1rem",
    backgroundColor: "inherit",
    fontWeight: 400,
  },
]);

export const headerFirstLine = style([s.flex, s.flexSpaceBetween]);

export const schemaName = style({ color: COLORS.LAVENDAR_DARK });

export const wrapper = style([
  s.scroll,
  { flex: 1, height: "100%", paddingBottom: "3rem", fontSize: "0.95rem" },
]);

export const footer = style([
  s.flex,
  s.flexSpaceBetween,
  {
    flexDirection: "row-reverse",
    position: "sticky",
    bottom: 0,
    padding: "1rem 0",
    backgroundColor: "inherit",
  },
]);

export const fieldSubText = style([
  {
    minHeight: "1.5rem",
    maxHeight: "2rem",
    fontSize: "0.9rem",
  },
]);

export const fieldList = style([s.flexColumn, { gap: "1rem" }]);

/**
 * button
 */
export const saveButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.light,
]);
