import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const layout = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1rem",
    padding: "2rem 15vw 5rem 15vw",
  },
]);

export const container = style([
  s.fullWidth,
  s.flexColumn,
  {
    marginBottom: "5rem",
  },
]);

export const wrapper = style([s.flex, { flexDirection: "row", gap: "1rem" }]);

export const projectInfoLeftWrapper = style([
  s.flexColumn,
  {
    flex: "40%",
    gap: "1rem",
  },
]);

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

export const projectInfoSection = style([
  s.full,
  s.border,
  {
    gap: "2rem",
    padding: "2rem",
    height: "90%",
  },
]);

export const projectInfoList = style([s.flexColumn, { gap: "1rem" }]);

export const projectInfo = style([s.flexColumn, { flex: 4, gap: "0.3rem" }]);

export const cmsInfoSection = style([
  s.border,
  s.flexColumn,
  {
    flex: "60%",
    padding: "2rem 3rem 2rem",
    gap: "2rem",
    width: "90%",
    minHeight: "25rem",
    listStyle: "none",
    borderColor: COLORS.GREY_CLEAR,
  },
]);

export const cmsInfoList = style([s.flexColumn, { gap: "1rem" }]);

export const cmsInfo = style([
  s.flex,
  s.flexCenter,
  s.flexSpaceBetween,
  s.border,
  {
    flex: 4,
    gap: "0.3rem",
    border: `1px solid ${COLORS.BLACK}`,
    padding: "1rem 2rem 1rem",
    borderColor: COLORS.GREY_CLEAR,
    borderRadius: "1rem",
    ":hover": {
      backgroundColor: COLORS.GREY_LIGHT,
    },
  },
]);

export const cmsInfoLeft = style([s.flex, s.flexCenter, { gap: "1rem" }]);

export const emptyCmsSection = style([
  s.border,
  s.flexColumn,
  s.flexCenter,
  {
    flex: "60%",
    padding: "2rem 3rem 2rem",
    gap: "2rem",
    width: "90%",
    minHeight: "25rem",
    borderStyle: "dashed",
    listStyle: "none",
    userSelect: "none",
  },
]);

export const emptyCmsButtonWrapper = style([
  s.flex,
  {
    gap: "2rem",
  },
]);

export const emptyCmsButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
]);
