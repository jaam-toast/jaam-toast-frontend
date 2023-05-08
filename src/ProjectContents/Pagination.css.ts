import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const hidden = style({ visibility: "hidden" });

export const paginationContainer = style([
  s.flex,
  s.alignItemsCenter,
  s.justifyContentCenter,
  {
    height: "5rem",
  },
]);

export const paginationNumberWrapper = style([
  s.flex,
  s.justifyContentCenter,
  s.alignItemsCenter,
  {
    minWidth: "12rem",
    maxWidth: "12rem",
  },
]);

export const paginationNumberPoint = style({ color: COLORS.LAVENDAR_DARK });

export const paginationSideWrapper = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
  {
    transition: "left 250ms linear",
  },
]);

export const paginationArrow = style([s.pointer]);

export const paginationCell = style([
  s.inlineFlex,
  s.justifyContentCenter,
  s.pointer,
  {
    padding: "0.3rem 0.5rem",
    minWidth: "2rem",
    maxWidth: "2rem",
    fontSize: "0.9rem",
    ":hover": {
      color: COLORS.LAVENDER,
    },
  },
]);
