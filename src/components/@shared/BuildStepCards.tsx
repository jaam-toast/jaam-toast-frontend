import { Avatar, Box, Card, CardHeader } from "@mui/material";

type BuildStepCardProps = {
  step: number;
};

function BuildStepCard({ step }: BuildStepCardProps) {
  function getStatus(cardStep: number): string {
    if (cardStep === step) {
      return "point";
    }

    return "default";
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{ minWidth: "30%", borderRadius: "10px", bgColor: "blue" }}
      >
        <CardHeader
          avatar={
            <Avatar color={getStatus(1)} aria-label="recipe">
              1
            </Avatar>
          }
          color={getStatus(1)}
          title="Select Git Repository"
          subheader="Import an existing Git Repository"
        />
      </Card>
      <Card variant="outlined" sx={{ minWidth: "30%", borderRadius: "10px" }}>
        <CardHeader
          avatar={
            <Avatar color={getStatus(2)} aria-label="recipe">
              2
            </Avatar>
          }
          color={getStatus(2)}
          title="Configure Project"
          subheader="Configure your Project."
        />
      </Card>
      <Card variant="outlined" sx={{ minWidth: "30%", borderRadius: "10px" }}>
        <CardHeader
          avatar={
            <Avatar color={getStatus(3)} aria-label="recipe">
              3
            </Avatar>
          }
          color={getStatus(3)}
          title="Deploy"
          subheader="Deploy it!"
        />
      </Card>
    </Box>
  );
}

export default BuildStepCard;
