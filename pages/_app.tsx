import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { isMobile } from "react-device-detect";

import MobileDefense from "../components/MobileDefense";
import ModalGlobal from "../components/ModalGlobal";
import theme from "../utils/theme";
import "../public/fonts/style.css";

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
