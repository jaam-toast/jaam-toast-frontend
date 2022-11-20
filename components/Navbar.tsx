import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { removeCookies } from "cookies-next";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import loginState, { isLoggedInState } from "../lib/recoil/auth";

import { LoginData } from "../types";

function NavBar() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setIsLoggedIn = useSetRecoilState<LoginData | null>(loginState);
  const router = useRouter();

  const handleLogout = () => {
    removeCookies("loginData");
    removeCookies("userOrgs");
    setIsLoggedIn(null);

    router.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        color="inherit"
        elevation={0}
        sx={{
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <ChangeHistoryIcon fontSize="large" />
          </IconButton>
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
