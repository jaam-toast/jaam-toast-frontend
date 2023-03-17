import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import TextFieldPreview from "./TextFieldPreveiw";

import { EnvsState } from "../types/projectOption";

function AccordionEnvs({ envs, setEnvs }: EnvsState["envsState"]) {
  const envsState = {
    envs,
    setEnvs,
  };

  return (
    <Accordion sx={{ mt: 2 }} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography id="modal-description" variant="body2">
          Environment Variable
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ mt: 1 }}>
        {envs.map((env, index) => (
          <Box
            key={`${env.key}-${index}`}
            display="flex"
            sx={{ flexDirection: "row", marginBottom: 1.5 }}
          >
            <TextFieldPreview envIndex={index} envsState={envsState} />
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionEnvs;
