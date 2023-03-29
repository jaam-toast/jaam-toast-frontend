import { User } from "types/auth";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  actions: {
    setUser: (user: User) => void;
  };
};

export const useUserStore = create<UserStore>()(set => ({
  user: null,
  actions: {
    setUser: (user: User) => set({ user }),
  },
}));

export const useUser = () => useUserStore((state: UserStore) => state.user);

export const useUserActions = () =>
  useUserStore((state: UserStore) => state.actions);
