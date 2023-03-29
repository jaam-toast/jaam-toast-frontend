import { User } from "types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UsetA = {
  user: User | null;
  actions: {
    setUser: (user: User) => void;
  };
};

export const useNewUser = create<UsetA>()(set => ({
  user: null,
  actions: {
    setUser: (user: User) => set({ user }),
  },
}));

export const useUserActions = () => useNewUser((state: UsetA) => state.actions);
