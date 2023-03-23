import { useRecoilState, useRecoilValue } from "recoil";
import { setCookie } from "cookies-next";
import { Box, Typography } from "@mui/material";

import { Button } from "../@shared";
import { deleteUserDeployment } from "src/api";
import useModal from "src/hooks/useModal";
import loginState from "src/recoil/auth";
import { userDeploymentsState } from "src/recoil/userDeployments";
import { BLACK, WHITE } from "src/constants/colors";

// import type { UserDeploymentData } from "types/deployment";
import type { LoginData } from "types/auth";

interface UserDeploymentData {
  cardData?: UserDeploymentData;
}

function ModalDeleteConfirm({ ...modalProps }: UserDeploymentData) {
  // const { data } =
  //   useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  // const [userDeploymentsList, setUserDeploymentsList] =
  //   useRecoilState<UserDeploymentData[]>(userDeploymentsState);
  // const { showModal, hideModal } = useModal();

  // const userId = data._id;
  // const { cardData } = modalProps;

  const handleClickDelete = async () => {
    // await deleteUserDeployment(
    //   userId,
    //   cardData.repoId as string,
    //   cardData.instanceId,
    //   cardData.repoName,
    //   cardData.repoOwner as string,
    //   cardData.webhookId as string,
    // );
    // const newUserDeploymentList = userDeploymentsList.filter(
    //   item => item.repoCloneUrl !== cardData.repoCloneUrl,
    // );
    // setUserDeploymentsList(newUserDeploymentList);
    // // setCookie("userDeployments", JSON.stringify(newUserDeploymentList));
    // hideModal();
    // showModal({
    //   modalType: "ModalDeleteAlert",
    // });
  };

  return (
    <Box sx={{ ...BoxStyle }}>
      <Box
        display="flex"
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          component="h3"
          fontWeight="bold"
        >
          Delete Project
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, textAlign: "center" }}>
          This project will be deleted, along with all of its Deployments,
          Domains, Environment Variables, and Settings.
        </Typography>
        <Typography
          id="modal-description"
          sx={{
            mt: 2,
            textAlign: "center",
            color: "rgba(255, 83, 83, 0.8)",
            fontWeight: "bold",
          }}
        >
          Warning: This action is not reversible. Please be certain.
        </Typography>
        <Button
          variant="contained"
          sx={{ ...ButtonStyle }}
          onClick={handleClickDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

const BoxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: `1px solid ${BLACK}`,
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const ButtonStyle = {
  mt: 3,
  bgcolor: "rgba(255, 83, 83, 0.8)",
  width: "50%",
  height: "2.5rem",
  borderRadius: 1,
  ":hover": {
    bgcolor: WHITE,
    color: BLACK,
  },
};

export default ModalDeleteConfirm;
