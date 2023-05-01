import { useModal, useModalState } from "../@hooks";
import * as css from "./Modal.css";

export function Modal() {
  const { isOpen, ModalComponent, location, animation } = useModalState();
  const { closeModal } = useModal();

  return isOpen ? (
    <div
      onClick={closeModal}
      className={`${css.container} ${css.location[location!]}`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`${css.modal} ${css.animation[animation!]}`}
      >
        {ModalComponent}
      </div>
    </div>
  ) : null;
}
