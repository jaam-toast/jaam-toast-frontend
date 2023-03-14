import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";
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

import Button from "./@shared/Button";
import Config from "../lib/config";
import useModal from "../lib/hooks/useModal";
import { cloneRepoName } from "../lib/recoil/git/clone";

function ModalDeploy() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [buildingLog, setBuildingLog] = useState<string[]>([]);
  const repoName = useRecoilValue<string>(cloneRepoName);

  const { showModal } = useModal();

  const handleClickModalCreate = () => {
    showModal({
      modalType: "ModalBuild",
    });
  };

  useEffect(() => {
    const socketIO = io(`${Config.SERVER_URL}`);
    setSocket(socketIO);

    return () => {
      socketIO.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;

    socket.on("connect", () => {
      console.info(
        `Socket for building log is connected - ${socket.id}`,
        socket.connected,
      );
    });

    socket.on("disconnect", () => {
      console.info(
        `Socket for building log is disconnected - ${socket.id}`,
        socket.connected,
      );
    });

    socket.emit("get-building-log", repoName);

    socket.on("new-building-log", data => {
      setBuildingLog(prev => [...prev, data as string]);
    });

    return () => {
      socket.off("new-building-log");
    };
  }, [repoName, socket]);

  return (
    <Box sx={style}>
      <Button
        variant="contained"
        color="light"
        onClick={handleClickModalCreate}
      >
        Prev
      </Button>
      <Box sx={{ width: "50%" }}>
        <Typography id="modal-title" variant="h6" component="h3" sx={{ mt: 2 }}>
          Deploy
        </Typography>
      </Box>
      <Divider sx={{ mt: 2 }} />
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
              flex: "1",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <table className="log-table" style={{ width: "100%" }}>
              <tbody className="log-table-body">
                {buildingLog.map((log, i) => (
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
    </Box>
  );
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

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

export default ModalDeploy;
