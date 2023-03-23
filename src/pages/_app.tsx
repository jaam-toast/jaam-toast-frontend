import Head from "next/head";
import { RecoilRoot } from "recoil";

import { ThemeProvider, CssBaseline, Divider } from "@mui/material";

import { isMobile } from "react-device-detect";

import MobileDefense from "src/components/modal/MobileDefense";
import ModalGlobal from "src/components/modal/ModalGlobal";
import NavBar from "src/components/Navbar";
import theme from "src/utils/theme";
import "../../public/fonts/style.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your
          Own Websites Quick And Easy Like Toasts
        </title>
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CssBaseline />
          {isMobile ? (
            <MobileDefense />
          ) : (
            <>
              <ModalGlobal />
              <NavBar />
              <Divider />
              <Component {...pageProps} />
            </>
          )}
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
