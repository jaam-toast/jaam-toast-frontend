import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1rem",
    padding: "5rem 15vw",
  },
]);

export const projectDetails = style([s.flex, { gap: "1rem" }]);

export const projectInfoSection = style([
  s.border,
  s.flexColumn,
  s.flexSpaceBetween,
  {
    padding: "3rem 3rem 2rem",
    width: "90%",
    listStyle: "none",
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    userSelect: "none",
  },
]);

export const projectInfoSectionTitle = style({
  fontWeight: 500,
  fontSize: "1.4rem",
  textTransform: "uppercase",
});

export const projectInfoList = style([s.flexColumn, { gap: "1rem" }]);

export const projectInfo = style([s.flexColumn, { gap: "0.3rem" }]);

export const projectInfoTitle = style({
  fontSize: "0.8rem",
  fontWeight: 500,
  textTransform: "uppercase",
});

export const projectInfoText = style({
  fontSize: "0.95rem",
});
