import { createTheme } from "@mui/material/styles";

// custom 컬러 예시
const tan = "tan";
const lightRed = "#f99";
const red = "red";
const offBlack = "#444";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard-Regular",
  },
  palette: {
    primary: {
      main: "#00ff62",
      light: "#00ff62",
      dark: "#4d00ff",
    },
    light: {
      main: "#FFF",
    },
    dark: {
      main: "#000",
      light: "",
      dark: "",
    },
    common: {
      tan,
      lightRed,
      red,
      offBlack,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "light" },
          style: {
            backgroundColor: "#FFF",
            color: "#000",
            "&:hover": {
              backgroundColor: "#000",
              color: "#FFF",
            },
          },
        },
        {
          props: { color: "dark" },
          style: {
            backgroundColor: "#000",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#FFF",
              color: "#000",
            },
          },
        },
      ],
    },
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
            backgroundColor: lightRed,
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
            backgroundColor: tan,
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
