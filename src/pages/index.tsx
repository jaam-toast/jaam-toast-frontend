import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";
import { getCookie } from "cookies-next";

import ButtonLogin from "src/components/ButtonLogin";
import { WHITE } from "src/constants/colors";
import Config from "src/config";

import type { GetServerSideProps } from "next";

function PageLanding() {
  const router = useRouter();

  const handleLoginClick = () => {
    const githubOauthLoginUrl = `${Config.GITHUB_OAUTH_URI}?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=${Config.API_SCOPE}`;
    router.push(githubOauthLoginUrl);
  };

  return (
    <Container maxWidth={false} disableGutters>
      // TODO: add variant(flex-center-column)
      <Box
        component="div"
        display="flex"
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          verticalAlign: "middle",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            padding: 1,
            height: "70vh",
            fontWeight: "bold",
          }}
        >
          Deploy your own project.
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            padding: 1,
            fontColor: WHITE,
          }}
        >
          Every deployment from the 2022 edition of <b>jaam-toast.</b>
        </Typography>
        <Box sx={{ padding: 1 }}>
          // TODO: pull out the button.
          <ButtonLogin />
        </Box>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  const loginCookieData = getCookie("loginData", { req, res });

  if (!!loginCookieData) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default PageLanding;
