import { useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Modal } from "@mui/material";

import ModalCreate from "./ModalCreate";
import ModalBuild from "./ModalBuild";
import ModalDeploy from "./ModalDeploy";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import { ModalCreateAlert, ModalDeleteAlert } from "./ModalAlert";
import ModalPreview from "./ModalPreview";
import ModalRepoDetails from "./ModalRepoDetails";
import buildOptionsState from "../lib/recoil/userBuildOptions";
import useModal from "../lib/hooks/useModal";

import { modalState } from "../types/modal";

function ModalGlobal() {
  const modal = useRecoilValue(modalState);
  const resetBuildOption = useResetRecoilState(buildOptionsState);

  const { modalType, modalProps } = modal || {};
  const { isModal, hideModal } = useModal();

  const renderComponent = () => {
    switch (modalType) {
      case "ModalCreate":
        return <ModalCreate {...modalProps} />;
      case "ModalBuild":
        return <ModalBuild {...modalProps} />;
      case "ModalDeploy":
        return <ModalDeploy {...modalProps} />;
      case "ModalDeleteConfirm":
        return <ModalDeleteConfirm {...modalProps} />;
      case "ModalDeleteAlert":
        return <ModalDeleteAlert {...modalProps} />;
      case "ModalPreview":
        return (
          <>
            <ModalCreateAlert />
            <ModalPreview {...modalProps} />;
          </>
        );
      case "ModalRepoDetails":
        return <ModalRepoDetails {...modalProps} />;
      default:
        return null;
    }
  };

  const handleCloseModal = () => {
    hideModal();
    resetBuildOption();
  };

  return (
    <Modal
      open={isModal != null}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box>{renderComponent()}</Box>
    </Modal>
  );
}

export default ModalGlobal;
