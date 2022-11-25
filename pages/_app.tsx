import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";

import MobileDefense from "../components/MobileDefense";
import ModalGlobal from "../components/ModalGlobal";
import theme from "../utils/theme";
import "../public/fonts/style.css";

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        {isMobile ? (
          <MobileDefense />
        ) : (
          <>
            <ModalGlobal />
            <Component {...pageProps} />
          </>
        )}
      </RecoilRoot>
    </ThemeProvider>
  );
}
