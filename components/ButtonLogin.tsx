import Link from "next/link";

import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

import { GITHUB_LOGIN_OAUTH_URI } from "../lib/config";

function ButtonLogin() {
  return (
    <Link href={GITHUB_LOGIN_OAUTH_URI}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#000",
          ":hover": {
            bgcolor: "#FFF",
            color: "#000",
          },
        }}
      >
        <GitHubIcon sx={{ m: 1 }} />
        Log in with GitHub
      </Button>
    </Link>
  );
}

export default ButtonLogin;
