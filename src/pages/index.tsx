import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { Box, Container, Typography } from "@mui/material";

import ButtonLogin from "src/components/ButtonLogin";
import { WHITE } from "src/constants/colors";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";

function PageLanding() {
  // const isLoggedIn = false;
  // const router = useRouter();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.replace("/dashboard");
  //   }
  // }, [isLoggedIn, router]);

  return (
    <Container maxWidth={false} disableGutters>
      {/* {!isLoggedIn && ( */}
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
          <ButtonLogin />
        </Box>
      </Box>
      {/* )} */}
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
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default PageLanding;
