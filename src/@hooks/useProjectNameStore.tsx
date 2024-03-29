import { create } from "zustand";
import { nanoid } from "nanoid";

import { getProject } from "../@utils/api";

type ProjectNameStore = {
  defaultProjectName: string | null;
  projectName: string | null;
  isAvailableProjectName: boolean;

  actions: {
    setDefaultProjectName: (projectName: string) => void;
    setProjectName: (projectName: string) => void;
  };
};

const useProjectNameStore = create<ProjectNameStore>()((set, get) => ({
  defaultProjectName: null,
  projectName: null,
  isAvailableProjectName: true,

  actions: {
    setDefaultProjectName: async (projectName: string) => {
      try {
        const project = await getProject(projectName);
        const newProjectName = !!project
          ? `${projectName}-${nanoid()}`
          : projectName;

        set({
          projectName: newProjectName,
          defaultProjectName: newProjectName,
          isAvailableProjectName: true,
        });
      } catch (error) {
        const newProjectName = `${projectName}-${nanoid()}`;

        set({
          projectName: newProjectName,
          defaultProjectName: newProjectName,
          isAvailableProjectName: true,
        });
      }
    },
    setProjectName: async (projectName: string) => {
      if (get().defaultProjectName === null || get().projectName === null) {
        return;
      }

      if (projectName === "") {
        set({ projectName, isAvailableProjectName: true });
        return;
      }

      set({ projectName });

      try {
        const project = await getProject(projectName);
        set({ isAvailableProjectName: !project });
      } catch (error) {
        set({ isAvailableProjectName: false });
      }
    },
  },
}));

export const useDefaultProjectName = () =>
  useProjectNameStore((state: ProjectNameStore) => state.defaultProjectName);

export const useProjectName = () =>
  useProjectNameStore((state: ProjectNameStore) => state.projectName);

export const useisAvailableProjectName = () =>
  useProjectNameStore(
    (state: ProjectNameStore) => state.isAvailableProjectName,
  );

export const useProjectNameActions = () =>
  useProjectNameStore((state: ProjectNameStore) => state.actions);
