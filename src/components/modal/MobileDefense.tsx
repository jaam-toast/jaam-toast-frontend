import { Container, Box, IconButton, Typography } from "@mui/material";
import { ChangeHistory as ChangeHistoryIcon } from "@mui/icons-material";

function MobileDefense() {
  return (
    <Container fixed sx={{ height: "10vh", padding: 1 }}>
      <Box
        display="flex"
        sx={{
          ...style,
        }}
      >
        <Box
          display="flex"
          sx={{
            flexDirection: "row",
            padding: 1,
            paddingBottom: 0,
            margin: 1,
          }}
        >
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="brand-logo"
          >
            <ChangeHistoryIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold" }}>
            Jaam-Toast
          </Typography>
        </Box>
        <Box
          display="flex"
          sx={{
            flexDirection: "column",
            padding: 1,
            paddingTop: 0,
            margin: 1,
          }}
        >
          <Typography>Not supported in mobile environment.</Typography>
          <Typography>
            <b>Please run it in a desktop environment.</b>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

const style = {
  height: "90vh",
  padding: 1,
  margin: 1,
  overflow: "hidden",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  border: 3,
  borderRadius: 2,
  borderColor: "#d3d3d3",
};

export default MobileDefense;
