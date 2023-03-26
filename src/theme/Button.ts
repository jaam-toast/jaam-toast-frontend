import { BLACK, WHITE } from "src/constants/colors";

type Variant = {
  props: {
    color:
      | "inherit"
      | "error"
      | "dark"
      | "light"
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warning";
  };
  style: {
    backgroundColor?: string;
    color?: string;
    "&:hover"?: {
      backgroundColor?: string;
      color?: string;
    };
  };
};

type MuiTheme = {
  variants: Variant[];
};

const ButtonTheme: MuiTheme = {
  variants: [
    {
      props: { color: "light" },
      style: {
        backgroundColor: WHITE,
        color: "dark",
        "&:hover": {
          backgroundColor: BLACK,
          color: WHITE,
        },
      },
    },
    {
      props: { color: "dark" },
      style: {
        backgroundColor: BLACK,
        color: "light",
        "&:hover": {
          backgroundColor: WHITE,
          color: BLACK,
        },
      },
    },
  ],
};

export default ButtonTheme;
