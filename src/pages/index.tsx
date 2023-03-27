import { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallMadeIcon from "@mui/icons-material/CallMade";

import useUser from "src/hooks/useUser";
import getUserFromCookie from "utils/getUserFromCookie";
import { WHITE } from "src/constants/colors";

import type { GetServerSideProps } from "next";

function LandingPage() {
  const { login } = useUser();
  const [tick, setTick] = useState<Boolean>(true);

  useEffect(() => {
    const tickTimer = setTimeout(() => {
      setTick(!tick);
    }, 800);

    return () => {
      clearTimeout(tickTimer);
    };
  }, [tick]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "2rem 10rem",
      }}
    >
      {/* // TODO: add variant(flex-center-column) */}
      <Box
        component="div"
        display="flex"
        sx={{
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "GmarketSans",
            fontSize: "8vw",
            textAlign: "left",
            fontWeight: "900",
          }}
        >
          Bringing Digital
          <br />
          Ideas to Life{tick && "."}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            margin: "2rem 0 4rem",
            lineHeight: "2.2rem",
            fontWeight: "500",
          }}
        >
          Jaam Toast를 이용하여 웹사이트 배포를 간편하게.
          <br />
          Github 저장소를 가져와 손쉽게 웹사이트를 만들 수 있으며,
          <br />
          언제든지 업데이트 할 수 있습니다.
        </Typography>
        <Box>
          <Button size="large" variant="dark" onClick={login}>
            <GitHubIcon sx={{ m: 1 }} />
            Continue with GitHub
            <CallMadeIcon sx={{ marginLeft: "0.5rem" }} />
          </Button>
        </Box>
      </Box>
      <Box
        component="div"
        display="flex"
        sx={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            padding: 1,
            fontColor: WHITE,
            fontSize: "1.1rem",
            fontWeight: "300",
          }}
        >
          Every deployment from the 2023 edition of Jaam Toast.
        </Typography>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  const user = getUserFromCookie({ req, res });

  if (!!user) {
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

export default LandingPage;
