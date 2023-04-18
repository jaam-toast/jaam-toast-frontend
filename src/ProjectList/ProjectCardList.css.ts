import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import * as colors from "../@config/colors";

export const container = style([
  s.flex,
  {
    flexWrap: "wrap",
    width: "100%",
    gap: "1rem 1%",
  },
]);

export const projectCard = style([
  s.flexColumn,
  s.flexSpaceBetween,
  s.poiner,
  {
    width: "32.5%",
    height: "16rem",
    padding: "2rem 1.5rem",
    backgroundColor: colors.LEMON,
    border: `1px solid ${colors.BLACK}`,
    borderRadius: "1.5rem",
  },
]);

export const projectCardhead = style([s.flex, { gap: "0.3rem" }]);

export const avatar = style({ marginRight: "-1rem" });

export const avatarIcon = style([
  s.full,
  { backgroundColor: colors.GREY_CLEAR },
]);

export const projectCardMain = style([
  s.flexColumn,
  {
    gap: "0.5rem",
  },
]);

export const projectCardFooter = style([
  s.flexColumn,
  {
    gap: "0.2rem",
  },
]);

export const projectCardAvartars = style({ height: "2.5rem" });

export const projectCardName = style({
  fontSize: "1.4rem",
  fontWeight: "700",
  lineHeight: "1.4rem",
  "::after": {
    content: "",
    display: "inline-block",
    width: "1rem",
    height: "1rem",
    marginLeft: "0.5rem",
    zoom: "100%",
    backgroundColor: "currentColor",
    WebkitMask: `url(/images/button-icon.svg) no-repeat center`,
    mask: `url("/images/button-icon.svg") no-repeat center`,
  },
});

export const projectCardUrl = style({
  fontSize: "0.9rem",
  fontWeight: 300,
});

export const projectCardCommitMessage = style({
  fontSize: "0.8rem",
});

export const projectCardUpdatedAt = style({
  fontSize: "0.8rem",
});

export const projectCardSkeleton = style([
  s.skeleton,
  {
    width: "32.5%",
    height: "15rem",
    borderRadius: "1.5rem",
  },
]);

export const avatarIconSkeleton = style([
  s.skeleton,
  { backgroundColor: colors.GREY_CLEAR },
]);
