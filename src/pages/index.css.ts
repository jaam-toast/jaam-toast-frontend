import { globalStyle } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
});

export const flexSpaceBetween = style({
  justifyContent: "space-between",
});

export const fullWidth = style({
  width: "100%",
});

export const fullHeigth = style({
  height: "100%",
});

export const container = style([
  fullWidth,
  fullHeigth,
  flexColumn,
  flexSpaceBetween,
  {
    gap: "1.5rem",
    padding: "2rem 10vw",
  },
]);

export const mainSectoin = style([
  flexColumn,
  {
    gap: "1.5rem",
  },
]);

export const mainCopy = style({
  fontFamily: "GmarketSans",
  fontSize: "7rem",
  textAlign: "left",
  fontWeight: "900",
  lineHeight: "9rem",
});

export const subCopy = style({
  fontSize: "1.3rem",
  fontWeight: "500",
  lineHeight: "2.2rem",
});

export const button = style([
  flex,
  flexSpaceBetween,
  {
    gap: "0.7rem",
    height: "4rem",
    padding: "0.5rem 3rem",
    borderRadius: "5rem",
    fontSize: "1.1rem",
    fontWeight: "700",
    textTransform: "uppercase",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
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

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  fontFamily: "Pretendard",
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});
