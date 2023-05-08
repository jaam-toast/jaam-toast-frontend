import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const projectCard = style([
  s.flexColumn,
  s.flexSpaceBetween,
  s.pointer,
  {
    width: "32.5%",
    height: "16rem",
    padding: "2rem 1.5rem",
    backgroundColor: COLORS.LEMON,
    border: `1px solid ${COLORS.GREY}`,
    borderRadius: "1.5rem",
    ":hover": {
      backgroundColor: COLORS.LAVENDER,
    },
  },
]);

export const projectCardhead = style([s.flex, { gap: "0.3rem" }]);

export const avatar = style({ marginRight: "-1rem" });

export const userProfile = style({ width: "3rem", objectFit: "contain" });

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

export const avatarIconSkeleton = style([s.skeleton, avatar]);
