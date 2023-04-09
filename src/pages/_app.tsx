import { useEffect, useState } from "react";
import App from "next/app";
import Head from "next/head";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { isMobile } from "react-device-detect";
import { ThemeProvider, CssBaseline } from "@mui/material";

import * as s from "./app.css";
import NavBar from "src/components/@shared/Navbar";
import { useUserActions } from "src/hooks/useUserStore";
import getUserFromCookie from "utils/getUserFromCookie";
import theme from "src/theme";
import "../../public/fonts/style.css";

import type { AppContext, AppProps } from "next/app";
import type { User } from "types/auth";
import type { DehydratedState } from "@tanstack/react-query";

type MyAppProps<T> = AppProps<T> & {
  user: User;
};

type MyAppPageProps = {
  dehydratedState: DehydratedState;
};

function MyApp({ Component, pageProps, user }: MyAppProps<MyAppPageProps>) {
  const { setUser } = useUserActions();
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      }),
  );

  useEffect(() => {
    setUser(user);
  }, []);

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
            <div className={s.container}>
              <CssBaseline />
              <NavBar />
              <Component {...pageProps} />
            </div>
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
