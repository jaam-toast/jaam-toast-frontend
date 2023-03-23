import { useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Modal } from "@mui/material";

import ModalDeleteConfirm from "./ModalDeleteConfirm";
import { ModalCreateAlert, ModalDeleteAlert } from "./ModalAlert";
import ModalRepoDetails from "./ModalRepoDetails";
import { buildOptionsState } from "src/recoil/buildOptions";
import useModal from "src/hooks/useModal";

import { modalState } from "types/modal";

function ModalGlobal() {
  // const modal = useRecoilValue(modalState);
  // const resetBuildOption = useResetRecoilState(buildOptionsState);

  const modal = { modalType: "mockdata", modalProps: {} };

  const { modalType, modalProps } = modal || {};
  const { isModal, hideModal } = useModal();

  const renderComponent = () => {
    switch (modalType) {
      case "ModalDeleteConfirm":
        return <ModalDeleteConfirm {...modalProps} />;
      case "ModalDeleteAlert":
        return <ModalDeleteAlert {...modalProps} />;
      case "ModalPreview":
      case "ModalRepoDetails":
        return <ModalRepoDetails {...modalProps} />;
      default:
        return null;
    }
  };

  const handleCloseModal = () => {
    hideModal();
    // resetBuildOption();
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
