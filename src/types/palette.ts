import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    light: PaletteColorOptions;
    dark: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    light: true;
    dark: true;
  }

  interface ButtonPropsVariantOverrides {
    light: true;
    dark: true;
  }
}

declare module "@mui/material/styles" {
  interface CommonColors {
    tan: string;
    lightRed: string;
    red: string;
    offBlack: string;
  }
}
