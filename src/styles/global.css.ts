import { globalStyle } from "@vanilla-extract/css";
import { pretendard } from "./font.css";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  fontFamily: pretendard,
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
