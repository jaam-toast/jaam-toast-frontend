import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import ModalGlobal from "../components/ModalGlobal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CssBaseline />
      <ModalGlobal />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
