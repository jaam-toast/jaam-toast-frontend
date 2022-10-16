import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" sx={{ boxShadow: "1" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ChangeHistoryIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jaam-Toast
          </Typography>
          <Tooltip title="Log out">
            <Button size="small" color="inherit">
              Log out
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
