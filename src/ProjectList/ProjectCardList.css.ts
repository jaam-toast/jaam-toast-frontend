import { style } from "@vanilla-extract/css";
import { s } from "../@styles";

export const container = style([
  s.flex,
  {
    flexWrap: "wrap",
    width: "100%",
    gap: "1rem 1%",
  },
]);

export const projectCardSkeleton = style([
  s.skeleton,
  {
    width: "32.5%",
    height: "15rem",
    borderRadius: "1.5rem",
  },
]);
