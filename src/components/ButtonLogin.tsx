import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Button } from "./@shared";
import { GITHUB_LOGIN_OAUTH_URI } from "../lib/config";

function ButtonLogin() {
  return (
    <Link href={GITHUB_LOGIN_OAUTH_URI}>
      <Button variant="contained" color="dark">
        <GitHubIcon sx={{ m: 1 }} />
        Log in with GitHub
      </Button>
    </Link>
  );
}

export default ButtonLogin;
