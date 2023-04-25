import { style } from "@vanilla-extract/css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([s.flex]);

export const card = style([
  s.flex,
  s.alignItemsCenter,
  {
    gap: "1rem",
    height: "8rem",
    border: `1px solid ${COLORS.BLACK}`,
    borderRadius: "4rem",
  },
]);

export const currentCard = style({
  backgroundColor: COLORS.MINT,
});

export const notCurrentCard = style({
  backgroundColor: COLORS.GREY_CLEAR,
});

export const stepAvatar = style([
  s.flex,
  s.flexCenter,
  s.full,
  { fontSize: "1.1rem", fontWeight: 700 },
]);

export const activeAvatar = style({
  backgroundColor: COLORS.STRAWBERRY,
});

export const inactiveAvatar = style({
  backgroundColor: COLORS.GREY,
});

export const firstCard = style({
  width: "100%",
  marginRight: "-8rem",
  paddingLeft: "3rem",
  zIndex: 999,
});

export const secondCard = style({
  width: "90%",
  marginRight: "-8rem",
  paddingLeft: "9rem",
  zIndex: 99,
});

export const thirdCard = style({
  width: "80%",
  paddingLeft: "9rem",
  zIndex: 9,
});

export const cardInfo = style([s.flexColumn, { gap: "0.3rem" }]);

export const cardMainInfo = style({ fontWeight: "500" });
export const cardSubInfo = style({ fontSize: "0.9rem" });
