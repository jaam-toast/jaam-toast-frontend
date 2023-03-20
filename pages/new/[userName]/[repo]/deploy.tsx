import { useRouter } from "next/router";
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
  Container,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { BorderBox, CenterBox } from "src/components/@shared";
import BuildStepCard from "src/components/build/BuildStepCards";
import { cloneRepoName, cloneUrlState } from "src/lib/recoil/git";
import { userDeploymentsState } from "lib/recoil/userDeployments";
import Config from "lib/config";
import isEmpty from "lib/utils/isEmpty";

import { UserDeploymentData } from "types/deployment";
import test from "../../../../test.json";
function Deploy() {
  const userDeploymentList =
    useRecoilValue<UserDeploymentData[]>(userDeploymentsState);
  const repoCloneUrl = useRecoilValue(cloneUrlState);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [buildingLog, setBuildingLog] = useState<string[]>([]);
  const repoName = useRecoilValue<string>(cloneRepoName);
  const router = useRouter();

  useEffect(() => {
    // * test 용도 목데이터 적용
    setBuildingLog(test[0].buildingLog);

    // * ButtonDeploy에서 요청 보낸 후 응답오면 setDeploymentList실행
    // * userDeploymentList에 추가되면 확인 후 4초 뒤에 preview로 이동
    if (
      isEmpty(userDeploymentList) ||
      repoCloneUrl !==
        userDeploymentList[userDeploymentList.length - 1].repoCloneUrl
    )
      return;

    const { userName, repo } = router.query;

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      router.push(`/new/${userName}/${repo}/preview`);
    }, 4000);

    return () => clearTimeout(timer);
  }, [userDeploymentList]);

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
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <>
        <Box>
          <Typography id="modal-title" variant="h4" component="h3">
            Deploy.
          </Typography>
          <Typography id="modal-title" variant="body2" gutterBottom>
            Please follow the steps to configure your Project and deploy it.
          </Typography>
        </Box>
        <BuildStepCard />
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
          </BorderBox>
        </CenterBox>
      </>
    </Container>
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

export default Deploy;
