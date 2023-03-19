import { useRouter } from "next/router";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import {
  AppBar,
  Button,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import useAuth from "lib/hooks/useAuth";
import { isLoggedInState } from "lib/recoil/auth";

function NavBar() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const router = useRouter();
  const { handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();

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
                  bgcolor: "light.main",
                  ":hover": {
                    bgcolor: "light.main",
                  },
                }}
                onClick={handleLogoutClick}
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
