import { style } from "@vanilla-extract/css";
import { s } from "../styles";

export const container = style([
  s.full,
  s.flexColumn,
  s.flexSpaceBetween,
  {
    gap: "1.5rem",
    padding: "2rem 10vw",
  },
]);

export const mainSectoin = style([
  s.flexColumn,
  {
    gap: "1.5rem",
  },
]);

export const mainCopy = style({
  fontFamily: "GmarketSans",
  fontSize: "7rem",
  lineHeight: "9rem",
});

export const subCopy = style({
  fontSize: "1.3rem",
  fontWeight: "500",
  lineHeight: "2.2rem",
});

export const loginButton = style([
  s.inlineFlex,
  s.alignItemsCenter,
  s.button,
  s.buttonColor.dark,
  s.buttonSize.large,
  s.poiner,
  {
    gap: "0.7rem",
    boxSizing: "content-box",
  },
]);

export const footer = style({
  position: "absolute",
  bottom: "1rem",
  height: "5vh",
  padding: "0.5rem 0",
  fontWeight: "300",
  textAlign: "center",
});
