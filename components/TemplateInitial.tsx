import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import Typography from "@mui/material/Typography";
import { Image, imageList } from "../imageList";

function DummyImage({ image }: { image: Image }) {
  return (
    <CardActionArea>
      <CardMedia
        component="img"
        height="130"
        image={image.image}
        alt={image.alt}
      />
      <CardContent>
        <Box
          display="flex"
          sx={{
            marginTop: 0.5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ChangeHistoryIcon fontSize="medium" sx={{ marginRight: 1 }} />
          <Typography
            variant="body2"
            sx={{ marginTop: 0.5, fontWeight: "bold" }}
          >
            {image.title}
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
  );
}

function TemplateInitial() {
  return (
    <Box
      border={1}
      sx={{
        padding: 5,
        borderColor: "#d3d3d3",
        borderRadius: 1,
      }}
    >
      <Box
        display="flex"
        sx={{
          flexDirection: "column",
          justifyContent: "cener",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          No projects, yet!
        </Typography>
        <Typography variant="body1" sx={{ padding: 1 }}>
          Create a project by importing a Git repository.
        </Typography>
      </Box>
      <Box display="flex" sx={{ flexDirection: "row" }}>
        {imageList.map(image => {
          return (
            <Box
              key={image.image}
              sx={{ padding: 1.5, marginTop: 4, width: "100%" }}
            >
              <Card elevation={4}>
                <DummyImage image={image} />
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default TemplateInitial;
