import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  SvgIcon,
  Container,
} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";

import { Button } from ".";
import useUser from "src/hooks/useUser";
import { BLACK, WHITE } from "src/constants/colors";
import Image from "next/image";

function NavBar() {
  const { isLoggedIn, logout } = useUser();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Container disableGutters>
      <AppBar
        position="relative"
        color="inherit"
        elevation={0}
        sx={{
          height: "7vh",
          justifyContent: "center",
          position: "sticky",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="button"
            sx={{
              display: "inline",
              width: "12rem",
              textTransform: "capitalize",
              fontWeight: "700",
              fontSize: "1.5rem",
              fontFamily: "GmarketSans",
              letterSpacing: "-2px",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={handleLogoClick}
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
    </Container>
  );
}

export default NavBar;
