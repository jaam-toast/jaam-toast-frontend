import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { isMobile } from "react-device-detect";

import MobileDefense from "src/components/MobileDefense";
import ModalGlobal from "src/components/ModalGlobal";
import NavBar from "src/components/Navbar";
import theme from "src/utils/theme";
import "../public/fonts/style.css";
import { TITLE } from "lib/constants/metadata";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const renderItems = () => {
    if (isMobile) {
      return <MobileDefense />;
    }

    return (
      <>
        <ModalGlobal />
        <Component {...pageProps} />
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        {!isSSR ? <>{renderItems()}</> : null}
      </RecoilRoot>
    </ThemeProvider>
  );
}
