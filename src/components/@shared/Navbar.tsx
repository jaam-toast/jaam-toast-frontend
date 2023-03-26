import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Tooltip } from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";

import { Button } from ".";
import useUser from "src/hooks/useUser";
import { BLACK, WHITE } from "src/constants/colors";

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
        borderBottom: "1px solid #1D1D1D",
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
              variant="dark"
              size="small"
              color="light"
              sx={{
                fontSize: "0.9rem",
                color: BLACK,
                padding: "0.4rem 1.5rem",
                border: `1px solid ${BLACK}`,
                backgroundColor: WHITE,
                ":hover": {
                  color: WHITE,
                  backgroundColor: BLACK,
                  border: `1px solid ${WHITE}`,
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
