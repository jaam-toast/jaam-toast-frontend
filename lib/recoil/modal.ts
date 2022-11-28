import { atom } from "recoil";

export const MODAL_TYPES = {
  ModalCreate: "ModalCreate",
  ModalBuild: "ModalBuild",
  ModalDeploy: "ModalDeploy",
  ModalDeleteConfirm: "ModalDeleteConfirm",
  ModalDeleteAlert: "ModalDeleteAlert",
  ModalPreview: "ModalPreview",
  ModalRepoDetails: "ModalRepoDetails",
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
export interface ModalDeleteAlertType {
  modalType: typeof MODAL_TYPES.ModalDeleteAlert;
  modalProps?: any;
}

export interface ModalPreviewType {
  modalType: typeof MODAL_TYPES.ModalPreview;
  modalProps?: any;
}

export interface ModalRepoDetailsType {
  modalType: typeof MODAL_TYPES.ModalRepoDetails;
  modalProps?: any;
}

export type ModalType =
  | ModalCreateType
  | ModalBuildType
  | ModalDeployType
  | ModalDeleteType
  | ModalDeleteAlertType
  | ModalPreviewType
  | ModalRepoDetailsType;

export const modalState = atom<ModalType | null>({
  key: "modalState",
  default: null,
});
