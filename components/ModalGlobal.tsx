import { useRecoilValue } from "recoil";

import { Box, Modal } from "@mui/material";

import useModal from "../lib/hooks/useModal";

import ModalCreate from "./ModalCreate";
import ModalBuild from "./ModalBuild";
import ModalDeploy from "./ModalDeploy";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

import { modalState } from "../lib/recoil/modal";

function ModalGlobal() {
  const modal = useRecoilValue(modalState);
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
        return <ModalDeploy />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={isModal != null}
      onClose={() => hideModal()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box>{renderComponent()}</Box>
    </Modal>
  );
}

export default ModalGlobal;
