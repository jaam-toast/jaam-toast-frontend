import { create } from "zustand";

type Location = "center" | "right";

type Animation = "slideToLeft" | "none";

type ModalState = {
  isOpen: boolean;
  ModalComponent: null | JSX.Element;
  location?: Location;
  animation?: Animation;

  actions: {
    openModal: ({
      component,
      location,
      animation,
    }: {
      component: JSX.Element;
      location?: Location;
      animation?: Animation;
    }) => void;
    offModal: () => void;
  };
};

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  ModalComponent: null,
  location: "center",
  animaion: "none",

  actions: {
    openModal: ({
      component,
      location = "center",
      animation = "none",
    }: {
      component: JSX.Element;
      location?: Location;
      animation?: Animation;
    }) => {
      set({
        isOpen: true,
        ModalComponent: component,
        location,
        animation,
      });
    },
    offModal: () => {
      set({
        isOpen: false,
        ModalComponent: null,
        location: "right",
        animation: "none",
      });
    },
  },
}));

export const useModalState = () => useModalStore();

export const useModal = () => useModalStore(state => state.actions);
