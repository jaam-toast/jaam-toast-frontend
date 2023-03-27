import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

type BuildingLogProps = {
  buildingLog?: string[];
};

function BuildingLog({ buildingLog }: BuildingLogProps) {
  return (
    <Accordion sx={{ mt: 2 }} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography id="modal-description" variant="body2">
          Building Log
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ mt: 1 }}>
        <Box
          component="div"
          sx={{ height: "40vh", overflow: "auto", flex: "1" }}
        >
          {buildingLog?.map((log, i) => (
            <p style={{ fontSize: "0.8rem" }}>{log}</p>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default BuildingLog;
