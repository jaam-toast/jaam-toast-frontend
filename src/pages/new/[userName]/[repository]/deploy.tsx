import { useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
  Container,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { BorderBox, CenterBox } from "src/components/@shared";
import BuildStepCard from "src/components/@shared/BuildStepCards";
import useBuildingLog from "src/hooks/useBuildingLog";
import useUser from "src/hooks/useUser";
import getUserFromCookie from "utils/getUserFromCookie";

import type { BuildOptions } from "types/projectOption";
import type { GetServerSideProps } from "next";

type DeployProps = {
  buildOptions: BuildOptions;
};

function DeployPage({ buildOptions }: DeployProps) {
  const router = useRouter();
  const { user } = useUser();
  const [buildingLog, setBuildingLog] = useState<string[]>([]);

  useBuildingLog("projectName", (data: string) => {
    setBuildingLog(prev => prev.concat(data));

    // TODO: Remove. temporary logic.
    if (data === "A new deployment's data is saved successfully!") {
      const { username, repository } = router.query;
      router.push(`/${username}/${repository}/preview`);
    }
  });

  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <Box>
        <Typography id="modal-title" variant="h4" component="h3">
          Deploy.
        </Typography>
        <Typography id="modal-title" variant="body2" gutterBottom>
          Please follow the steps to configure your Project and deploy it.
        </Typography>
      </Box>

      <BuildStepCard step={3} />

      <CenterBox>
        <BorderBox sx={{ boxShadow: 24, p: 4 }}>
          <Box sx={{ width: "100%", maxWidth: 800 }}>
            <Accordion sx={{ mt: 2 }} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Building</Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails sx={{ mt: 1 }}>
                <Box
                  component="div"
                  sx={{
                    height: "40vh",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {buildingLog.map((log, i) => (
                    <Typography
                      key={log}
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    >
                      {log}
                    </Typography>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </BorderBox>
      </CenterBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<
  DeployProps
> = async context => {
  const buildOptions = getCookie("buildOptions", context);
  const user = getUserFromCookie(context);

  if (!user || !buildOptions || buildOptions === true) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      buildOptions: JSON.parse(buildOptions),
    },
  };
};

export default DeployPage;
