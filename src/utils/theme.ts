import { createTheme } from "@mui/material/styles";

// custom 컬러 예시
const tan = "tan";
const lightRed = "#f99";
const red = "red";
const offBlack = "#444";
const white = "white";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard-Regular",
  },
  palette: {
    light: {
      main: "#FFF",
    },
    dark: {
      main: "#000",
    },
    common: {
      tan,
      lightRed,
      red,
      offBlack,
      white,
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
  },
});

export default theme;
