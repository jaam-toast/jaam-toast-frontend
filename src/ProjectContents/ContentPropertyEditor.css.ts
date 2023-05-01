import { style } from "@vanilla-extract/css";
import { pretendard } from "../@styles/font.css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const dataInput = style([s.textField]);

export const numberInput = style([s.textField]);

export const textarea = style([
  s.fullWidth,
  s.border,
  {
    padding: "1.5rem",
    resize: "vertical",
    font: `300 16px ${pretendard}`,
    fontSize: "0.9rem",
    minHeight: "5rem",
  },
]);

/**
 * toggle checkbox
 */
export const toggleButtonBox = style([
  s.flex,
  s.alignItemsCenter,
  {
    gap: "1rem",
  },
]);

export const toggleSwitch = style([
  {
    display: "block",
    position: "relative",
    width: "4rem",
    height: "2.1rem",
    borderRadius: "2.1rem",
    backgroundColor: COLORS.BLACK,
    cursor: "pointer",

    ":hover": {
      boxShadow: "0 0 0 max(1px, 0.2em) lightgray",
    },
    ":before": {
      transition: "left 250ms linear",
    },
  },
]);

export const toggleButton = style({
  border: `max(2px, 0.1rem) solid ${COLORS.BLACK}`,
  width: "2rem",
  height: "2rem",
  position: "absolute",
  top: "0.05rem",
  borderRadius: "50%",
  backgroundColor: COLORS.WHITE,
  zIndex: "10",
});

export const toggleButtonLeft = style([
  toggleButton,
  {
    left: "1px",
  },
]);

export const toggleButtonRight = style([
  toggleButton,
  {
    transform: "translateX(1.95rem)",
    backgroundColor: COLORS.LEMON,
  },
]);
