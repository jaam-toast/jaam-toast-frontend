import Head from "next/head";
import { RecoilRoot } from "recoil";

import { ThemeProvider, CssBaseline, Divider } from "@mui/material";

import { isMobile } from "react-device-detect";

import MobileDefense from "src/components/modal/MobileDefense";
import ModalGlobal from "src/components/modal/ModalGlobal";
import NavBar from "src/components/Navbar";
import theme from "src/utils/theme";
import "../../public/fonts/style.css";

import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { NextComponentType, NextPage } from "next";
import { getCookie } from "cookies-next";
import { LoginData } from "types/auth";
import { UserProvider } from "src/hooks/useUser";

interface MyAppProps extends AppProps {
  user: LoginData;
}
function MyApp({ Component, pageProps, user }: MyAppProps) {
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
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userData: LoginData =
    typeof loginCookieData === "boolean" ? {} : JSON.parse(loginCookieData);
  const user = {
    id: userData.data._id,
    name: userData.data.username,
    githubUri: userData.data.userGithubUri,
    image: userData.data.userImage,
    githubAccessToken: userData.githubAccessToken,
    accessToken: userData.accessToken,
  };

  return { ...appProps, user };
};

export default MyApp;
