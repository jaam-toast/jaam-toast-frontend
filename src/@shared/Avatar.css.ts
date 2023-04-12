import { style } from "@vanilla-extract/css";
import * as colors from "../@config/colors";
import { s } from "src/@styles";

export const container = style([
  s.flex,
  s.flexCenter,
  {
    width: "2.5rem",
    height: "2.5rem",
    border: `1px solid ${colors.BLACK}`,
    borderRadius: "2rem",
    flexShrink: 1,
    lineHeight: "2rem",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.25rem",
  },
]);

export const active = style({
  color: colors.WHITE,
  backgroundColor: colors.STRAWBERRY,
});

export const notActive = style({
  color: colors.WHITE,
  backgroundColor: colors.GREY,
});
