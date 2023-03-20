import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Avatar, Box, Card, CardHeader } from "@mui/material";

import { buildStepState } from "lib/recoil/buildOptions";

function BuildStepCards() {
  const [currentStep, setCurrentStep] = useRecoilState<number>(buildStepState);
  const router = useRouter();

  const { repo } = router.query;

  useEffect(() => {
    if (!repo) {
      setCurrentStep(1);
      return;
    }
    if (repo && !router.pathname.includes("deploy")) {
      setCurrentStep(2);
      return;
    } else {
      setCurrentStep(3);
    }
  }, []);

  function getStatus(cardStep: number): string {
    if (cardStep === currentStep) {
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

export default BuildStepCards;
