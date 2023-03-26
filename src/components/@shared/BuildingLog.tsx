import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

interface BuildingLog {
  buildingLog?: string[];
}

function BuildingLog({ buildingLog }: BuildingLog) {
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
          <table className="log-table" style={{ width: "100%" }}>
            <tbody className="log-table-body">
              {buildingLog?.map((log, i) => (
                <Tr
                  key={`${new Date().valueOf()} - ${i} - ${log}`}
                  className="log-table-row"
                >
                  <Td className="log-table-cell">
                    <span style={{ fontSize: "0.8rem" }}>{log}</span>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </table>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

const Tr = styled.tr`
  :hover {
    opacity: 0.8;
    color: white;
    background-color: rgba(51, 51, 51, 0.6);
    transition: background-color 0.15s ease;
  }
`;

const Td = styled.td`
  display: flex;
  margin-top: 0.1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export default BuildingLog;
