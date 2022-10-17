import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const card = (
  <>
    <CardActions />
    <CardContent />
  </>
);

const content = () => {
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
};

export default content;
