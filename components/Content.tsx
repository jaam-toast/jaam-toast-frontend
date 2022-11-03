import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

function Content() {
  return (
    <Box
      sx={{
        m: 1,
        width: "25%",
      }}
    >
      <Card variant="elevation">{card}</Card>
    </Box>
  );
}

const card = (
  <CardActionArea>
    <CardContent sx={{ padding: 0, margin: 2 }}>
      <Box display="flex" sx={{ flexDirection: "row", alignItems: "center" }}>
        <ChangeHistoryIcon fontSize="medium" />
        <Box display="flex" sx={{ flexDirection: "column", marginLeft: 1 }}>
          <Typography fontSize="large" fontWeight="bold">
            repository-name
          </Typography>
          <Typography fontSize="medium">site-url</Typography>
        </Box>
      </Box>
      <Typography fontSize="small" fontWeight="medium" sx={{ marginTop: 2 }}>
        📝[docs] Update README
      </Typography>
      <Box
        display="flex"
        sx={{ flexDirection: "row", marginTop: 2, alignItems: "center" }}
      >
        <Typography fontSize="small" fontWeight="medium">
          22h ago via
        </Typography>
        <GitHubIcon sx={{ marginLeft: 0.5 }} />
      </Box>
    </CardContent>
  </CardActionArea>
);

export default Content;
