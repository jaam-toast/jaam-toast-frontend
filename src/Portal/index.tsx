import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal } from "../@shared";
import { ConfirmModal } from "../@shared";
import { useConfirmModalState, useModalState } from "../@hooks";
import * as css from "./index.css";

export function Portal() {
  const { isOpen } = useModalState();
  const { isOpenConfirmModal } = useConfirmModalState();

  return (
    <>
      <ToastContainer />
      <div
        className={`${isOpen || isOpenConfirmModal ? css.container : css.hide}`}
      >
        {isOpen && <Modal />}
        {isOpenConfirmModal && <ConfirmModal />}
      </div>
    </>
  );
}
