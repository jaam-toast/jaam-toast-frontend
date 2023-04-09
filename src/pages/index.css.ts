import { style } from "@vanilla-extract/css";
import { s } from "../styles";

export const container = style([
  s.fullWidth,
  s.fullHeigth,
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

export const button = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
  s.poiner,
  {
    gap: "0.7rem",
    height: "4rem",
    padding: "0.5rem 3rem",
    borderRadius: "5rem",
    fontSize: "1.1rem",
    fontWeight: "700",
    textTransform: "uppercase",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    border: "1px solid #FFFFFF",
    ":hover": {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "1px solid #000000",
    },
  },
]);

export const footer = style({
  padding: "0.5rem 0",
  fontSize: "1.1rem",
  fontWeight: "300",
  textAlign: "center",
});
