import { globalStyle } from "@vanilla-extract/css";
import { pretendard } from "./font.css";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  font: `300 16px ${pretendard}`,
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  transition: "all 0.1s ease-out",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
