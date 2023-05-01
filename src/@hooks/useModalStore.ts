import { create } from "zustand";

type Location = "center" | "right";

type Animation = "slideToLeft" | "none";

type ModalState = {
  isOpen: boolean;
  ModalComponent: null | JSX.Element;
  location?: Location;
  animation?: Animation;
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
    closeModal: () => void;
  };
};

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
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

export const useModal = () => useModalStore(state => state.actions);
