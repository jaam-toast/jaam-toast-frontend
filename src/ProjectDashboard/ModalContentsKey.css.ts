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
    paddingBottom: "1rem",
    backgroundColor: "inherit",
    fontWeight: 400,
  },
]);

export const headerFirstLine = style([
  s.flex,
  s.flexSpaceBetween,
  // { paddingBottom: "1rem" },
]);

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

/**
 * field title
 */
export const fieldTitleBox = style([
  {
    padding: "1rem 0 0.5rem 0",
    marginBottom: "1rem",
    borderBottom: `2px solid ${COLORS.GREY_CLEAR}`,
  },
]);

export const fieldTitle = style([
  {
    padding: "1rem 0 0.48rem 0",
    marginBottom: "50px",
    borderBottom: `3px solid ${COLORS.RED_LIGHT}`,
    width: "fit-content",
    fontWeight: 450,
  },
]);

export const fieldSubText = style([
  {
    margin: "0.5rem 0.5rem 2rem 0.5rem",
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
  { gap: "1.5rem", padding: "1.5rem 2rem", backgroundColor: COLORS.LAVENDER },
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
    backgroundColor: "#fff",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "0.7rem 1.4rem",
    userSelect: "none",
    color: COLORS.GREY,
  },
]);

export const copied = style({
  backgroundColor: COLORS.MINT,
});
