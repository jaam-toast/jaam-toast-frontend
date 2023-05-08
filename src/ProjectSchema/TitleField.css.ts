import { style } from "@vanilla-extract/css";
import { COLORS } from "../@config/colors";

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
