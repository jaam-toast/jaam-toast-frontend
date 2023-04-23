import { style } from "@vanilla-extract/css";
import { s } from "../@styles";

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

const githubIconPath = "/images/github.svg";

export const loginButton = style([
  s.inlineFlex,
  s.alignItemsCenter,
  s.button,
  s.buttonColor.dark,
  s.buttonSize.large,
  s.pointer,
  {
    gap: "0.7rem",
    boxSizing: "content-box",
    fontWeight: 500,
    "::before": {
      content: "",
      display: "block",
      width: "1.5rem",
      height: "1.5rem",
      zoom: "100%",
      backgroundColor: "currentColor",
      WebkitMask: `url(${githubIconPath}) no-repeat center`,
      mask: `url(${githubIconPath}) no-repeat center`,
    },
  },
]);

export const footer = style({
  height: "5vh",
  padding: "0.5rem 0",
  fontWeight: "300",
  textAlign: "center",
});
