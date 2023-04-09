import { style } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
});

export const flexCenter = style({
  alignItems: "center",
  justifyContent: "center",
});

export const alignItemsCenter = style({
  alignItems: "center",
});

export const justifyContentCenter = style({
  justifyContent: "center",
});

export const flexSpaceBetween = style({
  justifyContent: "space-between",
});

export const full = style({
  width: "100%",
  height: "100%",
});

export const fullWidth = style({
  width: "100%",
});

export const fullHeigth = style({
  height: "100%",
});

export const poiner = style({
  cursor: "pointer",
});
