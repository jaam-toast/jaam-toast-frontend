import { create } from "zustand";
import { shallow } from "zustand/shallow";

type Location = "center" | "right";

type Animation = "slideToLeft" | "none";

type ModalStore = {
  isOpen: boolean;
  isOpenConfirmModal: boolean;
  isOpenAlert: boolean;
  confirmMessage: string;
  ModalComponent: null | JSX.Element;
  location?: Location;
  animation?: Animation;
  onConfirm: () => void;
  closeHandler: () => void;

  actions: {
    setCloseHandler: (callback: () => void) => void;
    openModal: ({
      component,
      location,
      animation,
    }: {
      component: JSX.Element;
      location?: Location;
      animation?: Animation;
    }) => void;
    openConfirm: ({
      message,
      onConfirm,
    }: {
      message: string;
      onConfirm: () => void;
    }) => void;
    closeConfirm: () => void;
    closeModal: () => void;
  };
};

export const useModalStore = create<ModalStore>((set, get) => ({
  isOpen: false,
  isOpenConfirmModal: false,
  isOpenAlert: false,
  onConfirm: () => {},
  confirmMessage: "",
  ModalComponent: null,
  location: "center",
  animaion: "none",
  closeHandler: () => {},

  actions: {
    setCloseHandler: callback => {
      set({ closeHandler: callback });
    },
    openModal: ({ component, location = "center", animation = "none" }) => {
      set({
        isOpen: true,
        ModalComponent: component,
        location,
        animation,
      });
    },
    openConfirm: ({ message, onConfirm }) => {
      set({ isOpenConfirmModal: true, confirmMessage: message, onConfirm });
    },
    closeConfirm: () => {
      set({ isOpenConfirmModal: false, confirmMessage: "" });
    },
    closeModal: () => {
      get().closeHandler();

      set({
        isOpen: false,
        ModalComponent: null,
        location: "right",
        animation: "none",
        closeHandler: () => {},
      });
    },
  },
}));

export const useModalState = () => useModalStore();

export const useConfirmModalState = () =>
  useModalStore(
    state => ({
      message: state.confirmMessage,
      isOpenConfirmModal: state.isOpenConfirmModal,
      onConfirm: state.onConfirm,
    }),
    shallow,
  );

export const useSetConfirmModal = () =>
  useModalStore(state => {
    return {
      openConfirm: state.actions.openConfirm,
      closeConfirm: state.actions.closeConfirm,
    };
  }, shallow);

export const useModal = () => useModalStore(state => state.actions);
