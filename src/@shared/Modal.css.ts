import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { s } from "../@styles";

/**
 * modal style variants and keyframes
 */
const fadeInKeyframe = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOutKeyframe = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const slideToLeftKeyframe = keyframes({
  from: { transform: "translateX(100%)", opacity: 0 },
  to: { transform: "translateX(0%)", opacity: 1 },
});

export const animation = styleVariants({
  none: {},
  slideToLeft: {
    animation: `${slideToLeftKeyframe} 0.3s`,
  },
});

export const location = styleVariants({
  center: {},
  right: { justifyContent: "flex-end" },
});

/**
 * classes
 */
export const container = style([
  s.flex,
  s.alignItemsCenter,
  s.justifyContentCenter,
  s.full,
  {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    transition: "opacity 3s",
    animation: `${fadeInKeyframe} 0.3s`,
  },
]);

export const modal = style([
  s.flex,
  s.alignItemsCenter,
  s.fullHeigth,
  s.scroll,
  {
    transition: "all 0.5s",
  },
]);
