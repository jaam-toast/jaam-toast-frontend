import { useRecoilState } from "recoil";
import { modalState } from "../recoil/modal";
import ModalBuild from "./ModalBuild";
import ModalCreate from "./ModalCreate";

function ModalGlobal() {
  const { modalType } = useRecoilState(modalState)[0] || {};

  const renderComponent = () => {
    if (!modalType) {
      return null;
    }

    switch (modalType) {
      case "ModalCreate":
        return <ModalCreate />;
      case "ModalBuild":
        return <ModalBuild />;
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
}

export default ModalGlobal;
