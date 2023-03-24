import { useState } from "react";
import App from "next/app";
import Head from "next/head";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { isMobile } from "react-device-detect";
import { getCookie } from "cookies-next";
import { ThemeProvider, CssBaseline, Divider } from "@mui/material";

import MobileDefense from "src/components/modal/MobileDefense";
import ModalGlobal from "src/components/modal/ModalGlobal";
import NavBar from "src/components/Navbar";
import { UserProvider } from "src/hooks/useUser";
import theme from "src/utils/theme";
import "../../public/fonts/style.css";

import type { AppContext, AppProps } from "next/app";
import type { User } from "src/hooks/useUser";
import type { DehydratedState } from "@tanstack/react-query";

type MyAppProps<T> = AppProps<T> & {
  user: User;
};

type MyAppPageProps = {
  dehydratedState: DehydratedState;
};

function MyApp({ Component, pageProps, user }: MyAppProps<MyAppPageProps>) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <>
      <Head>
        <title>
          Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your
          Own Websites Quick And Easy Like Toasts
        </title>
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            <RecoilRoot>
              <UserProvider user={user}>
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
              </UserProvider>
            </RecoilRoot>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const {
    ctx: { req, res },
  } = context;
  const loginCookieData = getCookie("loginData", { req, res });

  if (!loginCookieData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // TODO: to able to approach each getServerSideProps.
  const user: User =
    typeof loginCookieData === "boolean" ? {} : JSON.parse(loginCookieData);

  return { ...appProps, user };
};

export default MyApp;
