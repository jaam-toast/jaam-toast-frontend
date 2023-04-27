import { s } from "src/@styles";
import { COLORS } from "../@config/colors";
import { style } from "@vanilla-extract/css";

export const avatarIcon = style([
  s.full,
  { backgroundColor: COLORS.GREY_CLEAR },
]);
