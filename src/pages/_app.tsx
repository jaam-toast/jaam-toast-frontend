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
import { ThemeProvider, CssBaseline, Divider, Container } from "@mui/material";

import NavBar from "src/components/@shared/Navbar";
import { UserProvider } from "src/hooks/useUser";
import getUserFromCookie from "utils/getUserFromCookie";
import theme from "src/theme";
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
                <Container
                  maxWidth={false}
                  disableGutters
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    width: "100vw",
                    overflow: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  <CssBaseline />
                  <NavBar />
                  <Divider />
                  <Component {...pageProps} />
                </Container>
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
  const { req, res } = context.ctx;
  let user: User | null = null;

  if (!!req && !!res) {
    user = getUserFromCookie({ req, res });
  }

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { ...appProps, user };
};

export default MyApp;
