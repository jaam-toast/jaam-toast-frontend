import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.fullWidth,
  s.flexColumn,
  {
    marginBottom: "5rem",
  },
]);

export const wrapper = style([s.flex, { flexDirection: "row", gap: "1rem" }]);



export const sectionTitle = style({
  paddingBottom: "2rem",
  fontWeight: 500,
  fontSize: "1.4rem",
  textTransform: "uppercase",
});

export const infoText = style({
  fontSize: "0.95rem",
  fontWeight: 500,
});

export const infoFieldTitle = style({
  fontSize: "0.8rem",
  fontWeight: 400,
  color: COLORS.GREY,
  textTransform: "uppercase",
});

export const projectPreviewSection = style([s.full]);

export const projectInfoList = style([s.flexColumn, { gap: "1rem" }]);

export const projectInfo = style([s.flexColumn, { flex: 4, gap: "0.3rem" }]);
