import { style } from "@vanilla-extract/css";
import { s } from "../@styles";

export const layout = style([
  s.fullWidth,
  s.flexColumn,
  {
    gap: "1rem",
    padding: "2rem 15vw 5rem 15vw",
    fontSize: "0.9rem",
  },
]);
