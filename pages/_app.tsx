import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
