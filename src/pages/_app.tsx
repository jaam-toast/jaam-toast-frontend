import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider, CssBaseline, Divider } from "@mui/material";

import { isMobile } from "react-device-detect";

import MobileDefense from "src/components/modal/MobileDefense";
import ModalGlobal from "src/components/modal/ModalGlobal";
import NavBar from "src/components/Navbar";
import theme from "src/utils/theme";
import "../public/fonts/style.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
