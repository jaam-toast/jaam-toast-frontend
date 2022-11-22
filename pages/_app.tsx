import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import ModalGlobal from "../components/ModalGlobal";
import "../public/fonts/style.css";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard-Regular",
    },
  });

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
