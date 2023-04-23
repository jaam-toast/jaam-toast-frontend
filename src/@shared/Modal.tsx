import { useModal, useModalState } from "./useModalStore";
import * as css from "./Modal.css";

export function Modal() {
  const { isOpen, ModalComponent, location, animation } = useModalState();
  const { offModal } = useModal();

  return isOpen ? (
    <div
      onClick={offModal}
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
