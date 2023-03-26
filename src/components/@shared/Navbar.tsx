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
import CallMadeIcon from "@mui/icons-material/CallMade";

import { Button } from ".";
import useUser from "src/hooks/useUser";

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
        height: "7vh",
        justifyContent: "center",
        position: "sticky",
        padding: "0 10rem",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "700",
            fontSize: "1.5rem",
            fontFamily: "GmarketSans",
            letterSpacing: "-2px",
          }}
        >
          / Jaam Toast
        </Typography>
        {isLoggedIn && (
          <Tooltip title="Log out">
            <Button
              variant="outlined"
              size="large"
              color="light"
              sx={{
                padding: "0.4rem 1.5rem",
                border: "1px solid #000000",
                backgroundColor: "#FFFFFF",
                ":hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                  border: "1px solid #FFFFFF",
                },
              }}
              onClick={logout}
            >
              Log out
              <CallMadeIcon sx={{ marginLeft: "0.5rem" }} />
            </Button>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
