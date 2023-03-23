import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import TextFieldPreview from "./PreviewTextField";

import { Env } from "types/projectOption";

function PreviewEnvList({ envsList }: { envsList?: Env[] }) {
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
        {envsList?.map((env, index) => (
          <Box
            key={`${env.key}-${index}`}
            display="flex"
            sx={{ flexDirection: "row", marginBottom: 1.5 }}
          >
            <TextFieldPreview envIndex={index} envsList={envsList} />
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default PreviewEnvList;
