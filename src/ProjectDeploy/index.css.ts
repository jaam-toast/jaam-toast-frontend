import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1.5rem",
    padding: "2rem 15vw",
  },
]);

export const titleSection = style([s.flexColumn, { gap: "0.5rem" }]);

export const mainTitle = style({
  fontSize: "2rem",
});

export const subTitle = style({
  fontSize: "1rem",
});

export const buildLogSection = style([
  s.flexColumn,
  s.border,
  s.poiner,
  {
    gap: "1rem",
    padding: "2rem",
    backgroundColor: "pink",
  },
]);

export const sectionTitle = style({
  fontWeight: 700,
  fontSize: "1.3rem",
});

export const mainSection = style([s.flex, { gap: "1rem" }]);

export const buildLogList = style([
  s.flexColumn,
  s.border,
  s.scroll,
  {
    padding: "2rem",
    height: "30rem",
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    listStyle: "none",
    gap: "0.1rem",
    userSelect: "none",
  },
]);

export const hide = style({
  display: "none",
  fontStretch: "100%",
});

export const log = style({
  fontFamily: "Courier",
  whiteSpace: "pre",
  fontSize: "0.9rem",
});

export const previewSection = style([
  s.flexColumn,
  s.border,
  {
    gap: "1rem",
    padding: "2rem",
    backgroundColor: "#A7DA65",
  },
]);

export const preview = style([
  s.border,
  {
    width: "100%",
    aspectRatio: "1920 / 1280",
    userSelect: "none",
    overflow: "hidden",
  },
]);

export const previewFilter = style({
  ":hover": {
    filter: "blur(1px)",
  },
});

export const previewImage = style([s.full]);

export const buttonConsole = style([
  s.flexColumn,
  { flexShrink: 1, gap: "0.5rem" },
]);

export const previewOptionButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  {
    width: "15vw",
  },
]);

export const previewSkeleton = style([s.skeleton, preview]);
