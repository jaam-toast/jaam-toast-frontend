import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flex,
  s.fullWidth,
  {
    borderTop: `1px solid ${COLORS.GREY_CLEAR}`,
    paddingTop: "1.5rem",
    gap: "0.5rem",
    display: "flex",
    flexWrap: "wrap",
  },
]);

const assetPreviewBase = style([
  {
    borderRadius: "0.5rem",
    width: "10rem",
    height: "10rem",
  },
]);

export const assetPreviewWrapper = style([
  assetPreviewBase,
  s.pointer,
  {
    position: "relative",
  },
]);

export const assetPreviewName = style([
  s.scroll,
  {
    width: "10rem",
    maxHeight: "5rem",
    padding: "0 1rem",
    textAlign: "center",
    whiteSpace: "normal",
    wordWrap: "break-word",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
]);

const assetPreviewInfoBase = style([
  assetPreviewBase,
  {
    position: "absolute",
    zIndex: 9,
  },
]);

export const assetPreviewInfo = style([
  assetPreviewInfoBase,
  s.flexColumn,
  s.justifyContentCenter,
  s.alignItemsCenter,
  {
    gap: "1rem",
    zIndex: 99,
    color: COLORS.WHITE,
    textOverflow: "ellipsis",
    textAlign: "center",
    fontSize: "0.8rem",
  },
]);

export const assetPreviewBg = style([
  assetPreviewInfoBase,
  { backgroundColor: COLORS.BLACK, opacity: "70%" },
]);

export const assetPreviewImgWrapper = style([
  assetPreviewBase,
  {
    position: "absolute",
  },
]);

export const assetPreviewImg = style([
  s.pointer,
  {
    borderRadius: "0.5rem",
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
]);

export const assetPreviewWrapperSkeleton = style([
  s.skeleton,
  assetPreviewWrapper,
]);
