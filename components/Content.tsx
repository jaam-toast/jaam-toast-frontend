import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

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
  <>
    <CardActions />
    <CardContent />
  </>
);

export default Content;
