import { getCookie } from "cookies-next";
import { Box, Container, Typography, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import useUser from "src/hooks/useUser";
import { WHITE } from "src/constants/colors";

import type { GetServerSideProps } from "next";

function PageLanding() {
  const { login } = useUser();

  return (
    <Container maxWidth={false} disableGutters>
      {/* // TODO: add variant(flex-center-column) */}
      <Box
        component="div"
        display="flex"
        sx={{
          flexDirection: "column",
          justifyContent: "center",
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
        <Button variant="contained" color="dark" onClick={login}>
          <GitHubIcon sx={{ m: 1 }} />
          Log in with GitHub
        </Button>
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
