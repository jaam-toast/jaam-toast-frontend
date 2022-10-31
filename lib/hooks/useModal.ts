import { useRecoilState } from "recoil";
import { modalState, ModalType } from "../recoil/modal";

function useModal() {
  const [isModal, setIsModal] = useRecoilState(modalState);

  const showModal = (modalTypeObj: ModalType) => {
    setIsModal(modalTypeObj);
  };

  const hideModal = () => {
    setIsModal(null);
  };

  return {
    isModal,
    setIsModal,
    showModal,
    hideModal,
  };
}

export default useModal;
