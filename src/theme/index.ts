import { createTheme } from "@mui/material/styles";
import { BLACK, BLACK_OFF, RED, RED_LIGHT, TAN, WHITE } from "src/theme/colors";
import ButtonTheme from "./Button";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard",
  },
  palette: {
    primary: {
      main: "#00ff62",
      light: "#00ff62",
      dark: "#4d00ff",
    },
    light: {
      main: WHITE,
    },
    dark: {
      main: BLACK,
      light: "",
      dark: "",
    },
    common: {
      tan: TAN,
      lightRed: RED_LIGHT,
      red: RED,
      offBlack: BLACK_OFF,
    },
  },
  components: {
    MuiButton: ButtonTheme,
    MuiAvatar: {
      variants: [
        {
          props: { color: "default" },
          style: {
            backgroundColor: "#8c8c8c",
          },
        },
        {
          props: { color: "point" },
          style: {
            backgroundColor: RED_LIGHT,
          },
        },
      ],
    },
    MuiCardHeader: {
      variants: [
        {
          props: { color: "default" },
          style: {
            backgroundColor: "#b8ffd3",
          },
        },
        {
          props: { color: "point" },
          style: {
            backgroundColor: TAN,
          },
        },
      ],
    },
    MuiInputBase: {
      variants: [
        {
          props: { size: "small" },
          style: {
            height: "35px",
            width: "100%",
          },
        },
      ],
    },
  },
});

export default theme;
