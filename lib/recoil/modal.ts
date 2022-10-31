import { atom } from "recoil";

export const MODAL_TYPES = {
  ModalCreate: "ModalCreate",
  ModalBuild: "ModalBuild",
} as const;

export interface ModalCreateType {
  modalType: typeof MODAL_TYPES.ModalCreate;
}

export interface ModalBuildType {
  modalType: typeof MODAL_TYPES.ModalBuild;
}

export type ModalType = ModalCreateType | ModalBuildType;

export const modalState = atom<ModalType | null>({
  key: "modalState",
  default: null,
});
