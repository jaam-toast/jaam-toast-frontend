import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "../public/fonts/style.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../utils/theme";

import ModalGlobal from "../components/ModalGlobal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        <ModalGlobal />
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}
