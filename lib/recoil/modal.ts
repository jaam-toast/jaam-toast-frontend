import { atom } from "recoil";

export const MODAL_TYPES = {
  ModalCreate: "ModalCreate",
  ModalBuild: "ModalBuild",
  ModalDeploy: "ModalDeploy",
  ModalDeleteConfirm: "ModalDeleteConfirm",
  ModalAlert: "ModalAlert",
} as const;

export interface ModalCreateType {
  modalType: typeof MODAL_TYPES.ModalCreate;
  modalProps?: any;
}

export interface ModalBuildType {
  modalType: typeof MODAL_TYPES.ModalBuild;
  modalProps?: any;
}

export interface ModalDeployType {
  modalType: typeof MODAL_TYPES.ModalDeploy;
  modalProps?: any;
}

export interface ModalDeleteType {
  modalType: typeof MODAL_TYPES.ModalDeleteConfirm;
  modalProps?: any;
}
export interface ModalAlertType {
  modalType: typeof MODAL_TYPES.ModalAlert;
  modalProps?: any;
}

export type ModalType =
  | ModalCreateType
  | ModalBuildType
  | ModalDeployType
  | ModalDeleteType
  | ModalAlertType;

export const modalState = atom<ModalType | null>({
  key: "modalState",
  default: null,
});
