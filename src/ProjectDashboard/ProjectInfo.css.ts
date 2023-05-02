import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const projectInfoContainer = style([
  s.flexColumn,
  {
    flex: "40%",
    gap: "1rem",
  },
]);

export const projectInfoText = style({
  fontSize: "0.95rem",
  fontWeight: 500,
});

export const projectInfoFieldTitle = style({
  fontSize: "0.8rem",
  fontWeight: 400,
  color: COLORS.GREY,
  textTransform: "uppercase",
});

export const projectPreviewSection = style([{ aspectRatio: "1920 / 1280" }]);

export const projectInfoSection = style([
  s.full,
  s.border,
  {
    gap: "2rem",
    padding: "2rem",
    height: "20rem",
  },
]);

export const projectInfoList = style([s.flexColumn, { gap: "1rem" }]);

export const projectInfo = style([s.flexColumn, { flex: 4, gap: "0.3rem" }]);

export const projectInfoContainerSkeleton = style([
  s.skeleton,
  projectInfoContainer,
]);

export const projectPreviewSectionSkeleton = style([
  s.skeleton,
  projectPreviewSection,
]);

export const projectInfoSectionSkeleton = style([
  s.skeleton,
  projectInfoSection,
  { border: "none" },
]);
