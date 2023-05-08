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

export const header = style([
  s.flex,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  s.fullWidth,
  {
    paddingBottom: "1.5rem",
  },
]);

export const headerDescriptionBox = style({ margin: "0.5rem 0 1rem 0" });

export const headerDescription = style({
  fontSize: "0.9rem",
  lineHeight: "1.5rem",
});

export const newButton = style([
  s.button,
  s.buttonSize.medium,
  s.buttonColor.dark,
  {
    ":hover": {
      backgroundColor: COLORS.STRAWBERRY,
      borderColor: "none",
    },
  },
]);

export const subDescriptionToggle = style({
  margin: "1rem",
  color: COLORS.GREY,
});

export const subDescriptionImg = style([s.border, { margin: "1rem" }]);

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

//

export const settingOptionSection = style([
  s.border,
  s.flexColumn,
  {
    gap: "1.5rem",
    padding: "1.5rem 2rem",
    minHeight: "9rem",
    backgroundColor: COLORS.LAVENDER,
  },
]);

export const sectionHead = style([s.flex, s.flexSpaceBetween]);

export const saveButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.dark,
]);

export const subDescription = style({
  margin: "0.5rem",
  fontSize: "0.9rem",
  lineHeight: "1.5rem",
  color: COLORS.GREY,
});

export const optionBox = style([
  s.flex,
  {
    width: "20rem",
    justifyContent: "flex-end",
  },
]);
