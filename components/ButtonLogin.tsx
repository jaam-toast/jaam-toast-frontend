import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

const buttonLogin = () => {
  return (
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
  );
};

export default buttonLogin;
