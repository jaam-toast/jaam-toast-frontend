import { useRouter } from "next/router";
import Image from "next/image";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { deleteCookie } from "cookies-next";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import loginState, { isLoggedInState } from "../lib/recoil/auth";

import { LoginData } from "../types";

function NavBar() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setIsLoggedIn = useSetRecoilState<LoginData | null>(loginState);
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("loginData");
    deleteCookie("userOrgs");
    deleteCookie("userDeployments");
    setIsLoggedIn(null);

    router.push("/login");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Box sx={{ height: "10vh" }}>
      <AppBar
        position="relative"
        color="inherit"
        elevation={0}
        sx={{
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Box sx={{ height: "100%" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="brand-logo"
              onClick={handleLogoClick}
            >
              <Image
                src="/images/jaamtoast-logo.svg"
                alt="Jaamtoast logo"
                width="50%"
                height="50%"
              />
            </IconButton>
          </Box>
          <Typography
            variant="h4"
            component="div"
            sx={{
              paddingRight: 1.5,
              marginTop: 0.5,
              color: "#d3d3d3",
            }}
          >
            /
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jaam-Toast
          </Typography>
          {isLoggedIn ? (
            <Tooltip title="Log out">
              <Button
                variant="contained"
                size="small"
                color="inherit"
                sx={{
                  bgcolor: "#FFF",
                  ":hover": {
                    bgcolor: "#FFF",
                    color: "#000",
                  },
                }}
                onClick={handleLogout}
              >
                Log out
              </Button>
            </Tooltip>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
