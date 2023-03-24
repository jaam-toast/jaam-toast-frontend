import { useRouter } from "next/router";
import Image from "next/image";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import { Button } from "./@shared";
import useUser from "src/hooks/useUser";
import { WHITE } from "src/constants/colors";

function NavBar() {
  const { isLoggedIn, logout } = useUser();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <AppBar
      position="relative"
      color="inherit"
      elevation={0}
      sx={{
        height: "10vh",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
            color: WHITE,
          }}
        >
          /
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Jaam-Toast
        </Typography>
        {isLoggedIn && (
          <Tooltip title="Log out">
            <Button
              size="small"
              color="light"
              sx={{
                bgcolor: "light.main",
                ":hover": {
                  color: "dark.main",
                  bgcolor: "light.main",
                },
              }}
              onClick={logout}
            >
              Log out
            </Button>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
