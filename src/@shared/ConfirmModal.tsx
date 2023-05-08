import * as css from "./ConfirmModal.css";
import { useConfirmModalState, useSetConfirmModal } from "../@hooks";

export function ConfirmModal() {
  const { message, onConfirm } = useConfirmModalState();
  const { closeConfirm } = useSetConfirmModal();

  const handleCancelClick = () => {
    closeConfirm();
  };

  const handleDeleteClick = async () => {
    await onConfirm();
    closeConfirm();
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.messageWrapper}>
          <h3>DELETE</h3>
          <div className={css.message}>{message}</div>
        </div>
        <div className={css.buttonWrapper}>
          <button onClick={handleCancelClick} className={css.button}>
            Cancel
          </button>
          <button
            onClick={handleDeleteClick}
            className={`${css.button} ${css.deleteButton}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
