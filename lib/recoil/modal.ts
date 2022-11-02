import { atom } from "recoil";

export const MODAL_TYPES = {
  ModalCreate: "ModalCreate",
  ModalBuild: "ModalBuild",
  ModalDeploy: "ModalDeploy",
} as const;

export interface ModalCreateType {
  modalType: typeof MODAL_TYPES.ModalCreate;
}

export interface ModalBuildType {
  modalType: typeof MODAL_TYPES.ModalBuild;
}

export interface ModalDeployType {
  modalType: typeof MODAL_TYPES.ModalDeploy;
}

export type ModalType = ModalCreateType | ModalBuildType | ModalDeployType;

export const modalState = atom<ModalType | null>({
  key: "modalState",
  default: null,
});
