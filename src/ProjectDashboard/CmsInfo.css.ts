import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const infoText = style({
  fontSize: "0.95rem",
  fontWeight: 500,
});

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

export const infoFieldTitle = style({
  fontSize: "0.8rem",
  fontWeight: 400,
  color: COLORS.GREY,
  textTransform: "uppercase",
});

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

export const contentsKey = style([
  s.flex,
  s.pointer,
  {
    marginTop: "2rem",
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
