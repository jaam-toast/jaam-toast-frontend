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
    width: "40rem",
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
    backgroundColor: "inherit",
    fontWeight: 400,
  },
]);

export const headerFirstLine = style([
  s.flex,
  s.flexSpaceBetween,
  { padding: "1.5rem 0" },
]);

export const fieldSubText = style([
  {
    margin: "0.5rem 0.5rem",
    lineHeight: "1.5rem",
    minHeight: "1.5rem",
    maxHeight: "2rem",
    fontSize: "0.9rem",
    color: COLORS.GREY,
    fontWeight: "300",
  },
]);
export const fieldWrapper = style([s.flexColumn, { gap: "1rem" }]);

export const settingOptionSection = style([
  s.border,
  s.flexColumn,
  {
    gap: "1.5rem",
    padding: "1.5rem 2rem",
    marginBottom: "2rem",
    backgroundColor: COLORS.LAVENDER,
  },
]);

export const sectionHead = style([s.flex, s.flexSpaceBetween]);

export const sectionTitle = style({
  fontWeight: 500,
  textTransform: "uppercase",
});

export const sectionSubtitle = style({
  fontWeight: 500,
  fontSize: "0.9rem",
});

export const contentsKey = style([
  s.border,
  s.pointer,
  {
    backgroundColor: COLORS.WHITE,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "0.7rem 1.4rem",
    userSelect: "none",
    color: COLORS.GREY,

    ":hover": {
      backgroundColor: COLORS.LEMON,
    },
  },
]);

export const contentsApiExample = style([
  s.border,
  s.scroll,
  s.pointer,
  {
    maxHeight: "5rem",
    backgroundColor: COLORS.WHITE,
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "0.7rem 1.4rem",
    userSelect: "none",
    color: COLORS.GREY,

    ":hover": {
      backgroundColor: COLORS.LEMON,
    },
  },
]);

export const copied = style({
  backgroundColor: COLORS.MINT,
});
