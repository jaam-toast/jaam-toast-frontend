import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { io, Socket } from "socket.io-client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

import Config from "../lib/config";
import useModal from "../lib/hooks/useModal";

import { cloneRepoName } from "../lib/recoil/git/clone";

function ModalDeploy() {
  const [socket, setSocket] = useState<Socket>();
  const [bulidingLog, setBuildingLog] = useState<string[]>([]);
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
    if (!socket) return;

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
      console.info(data);

      setBuildingLog(prev => [...prev, data as string]);
    });
  }, [repoName, socket]);

  return (
    <Box sx={style}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#FFF",
          color: "#000",
          ":hover": {
            bgcolor: "#000",
            color: "#FFF",
          },
        }}
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
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Building</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ mt: 1 }}>
          <Typography>ModalDeploy</Typography>
          <table className="log-table">
            <tbody className="log-table-body">
              {bulidingLog.map(log => (
                <tr
                  key={`${new Date().valueOf()} - ${log}`}
                  className="log-table-row"
                >
                  <td className="log-table-cell">
                    <span>{log}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ModalDeploy;
