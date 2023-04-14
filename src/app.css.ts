import { style } from "@vanilla-extract/css";
import { s } from "./@styles";
import * as colors from "./@config/colors";

export const container = style([
  s.flexColumn,
  s.scroll,
  {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors.PAPER,
  },
]);

export const containerSkeleton = style([s.full, { padding: "2rem 15vw" }]);
export const pageSkeleton = style([s.full, s.skeleton]);
