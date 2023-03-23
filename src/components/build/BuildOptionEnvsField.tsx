import { AccordionDetails, Divider } from "@mui/material";
import { Box } from "@mui/system";

import BuildOptionEnvsTextField from "./BuildOptionEnvsTextField";
import BuildOptionEnvsSavedTextField from "./BuildOptionEnvsSavedTextField";

function BuildOptionEnvsField() {
  // TODO: existed env list styling(****).
  const envList = [{ key: "example env key 1", value: "example env value 2" }];

  return (
    <AccordionDetails sx={{ mt: 1 }}>
      <BuildOptionEnvsTextField />
      <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
      {envList.map((env, index) => (
        <Box
          key={`${env.key}-${index}`}
          display="flex"
          sx={{ flexDirection: "row", marginBottom: 1.5 }}
        >
          <BuildOptionEnvsSavedTextField envIndex={index} envsState={envList} />
        </Box>
      ))}
    </AccordionDetails>
  );
}

export default BuildOptionEnvsField;
