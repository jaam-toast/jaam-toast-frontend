import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.border,
  s.scroll,
  {
    border: "none",
    margin: "1rem",
    width: "40rem",
    minHeight: "40rem",
    maxHeight: "40rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const header = style([
  s.flex,
  s.alignItemsCenter,
  s.justifyContentCenter,
  {
    gap: "1rem",
    padding: "1rem",
    width: "40rem",
    height: "5rem",
    position: "fixed",
    color: COLORS.WHITE,
  },
]);

export const assetInfo = style([
  s.flex,
  s.flexSpaceBetween,
  {
    padding: "1rem",
    flexWrap: "wrap",
    zIndex: 9,
    width: "40rem",
  },
]);

export const assetInfoWrapper = style([
  s.flexColumn,
  s.scroll,
  {
    width: "80%",
  },
]);

export const assetName = style({
  maxWidth: "40rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const assetInfoDeleteIcon = style([s.pointer, { zIndex: 9 }]);

export const assetInfoBg = style([
  s.flexColumn,
  s.fullWidth,
  {
    borderRadius: "1.5rem 1.5rem 0 0",
    width: "40rem",
    minHeight: "5rem",
    maxHeight: "10rem",
    position: "fixed",
    backgroundColor: COLORS.BLACK,
    opacity: "50%",
  },
]);

export const assetImgWrapper = style([
  s.inlineFlex,
  s.justifyContentCenter,
  s.scroll,
  {
    width: "100%",
    height: "40rem",
  },
]);

export const assetImg = style({
  width: "100%",
  height: "auto",
  objectFit: "scale-down",
});
