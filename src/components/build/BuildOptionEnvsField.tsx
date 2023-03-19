import { AccordionDetails, Divider } from "@mui/material";
import { Box } from "@mui/system";
import buildOptionsState from "lib/recoil/userBuildOptions";
import { useRecoilValue } from "recoil";
import BuildOptionEnvsSavedTextField from "./BuildOptionEnvsSavedTextField";
import BuildOptionEnvsTextField from "./BuildOptionEnvsTextField";

function BuildOptionEnvsField() {
  const buildOption = useRecoilValue(buildOptionsState);
  return (
    <AccordionDetails sx={{ mt: 1 }}>
      <>
        <BuildOptionEnvsTextField />
        <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
        {buildOption?.envList.map((env, index) => (
          <Box
            key={`${env.key}-${index}`}
            display="flex"
            sx={{ flexDirection: "row", marginBottom: 1.5 }}
          >
            <BuildOptionEnvsSavedTextField
              envIndex={index}
              envsState={buildOption.envList}
            />
          </Box>
        ))}
      </>
    </AccordionDetails>
  );
}

export default BuildOptionEnvsField;
