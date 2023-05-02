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

export const typeButton = style([
  s.inlineFlex,
  s.pointer,
  {
    position: "absolute",
    paddingRight: "4.5rem",
  },
]);

export const addButton = style([
  s.buttonColor.dark,
  s.pointer,
  {
    position: "absolute",
    padding: "0 1rem",
    borderRadius: "0 1.5rem 1.5rem 0",
    border: `1px solid ${COLORS.BLACK}`,
    height: "inherit",
    zIndex: 1,
  },
]);

export const fieldNameSection = style([s.flexColumn]);

export const fieldNameWrapper = style([
  s.flex,
  s.alignItemsCenter,
  {
    justifyContent: "flex-end",
    height: "3rem",
    marginBottom: "1rem",
  },
]);

export const fieldNameInput = style([
  {
    position: "relative",
    borderRadius: "1.5rem",
    border: `1px solid ${COLORS.BLACK}`,
    width: "100%",
    height: "3rem",
    padding: "0 2rem",
    fontSize: "1rem",
  },
]);

export const warningMessage = style({
  padding: "0 1rem 1rem 1rem",
  fontSize: "0.8rem",
  color: COLORS.RED,
});

export const containerSkeleton = style([
  s.alignItemsCenter,
  s.justifyContentCenter,
  s.skeleton,
  container,
]);
