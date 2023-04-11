import { create } from "zustand";

import { useAuth } from "./useAuth";
import createRandomId from "../utils/createRandomId";
import APIClient from "../utils/api";

type ProjectNameStore = {
  defaultProjectName: string | null;
  projectName: string | null;
  isProjectNameAvailable: boolean;

  actions: {
    setDefaultProjectName: (projectName: string) => void;
    setProjectName: (projectName: string) => void;
  };
};

const useProjectNameStore = create<ProjectNameStore>()((set, get) => ({
  defaultProjectName: null,
  projectName: null,
  isProjectNameAvailable: true,

  actions: {
    setDefaultProjectName: async (projectName: string) => {
      const { user } = useAuth();

      if (!user) {
        return;
      }

      const api = new APIClient()
        .setAccessToken(user.accessToken)
        .setGithubAccessToken(user.githubAccessToken)
        .setUserId(user.id);

      try {
        const project = await api.getProject(projectName);
        const newProjectName = !!project
          ? `${projectName}-${createRandomId()}`
          : projectName;

        set({
          projectName: newProjectName,
          defaultProjectName: newProjectName,
          isProjectNameAvailable: true,
        });
      } catch (error) {
        const newProjectName = `${projectName}-${createRandomId()}`;

        set({
          projectName: newProjectName,
          defaultProjectName: newProjectName,
          isProjectNameAvailable: true,
        });
      }
    },
    setProjectName: async (projectName: string) => {
      const { user } = useAuth();

      if (!user) {
        return;
      }

      const api = new APIClient()
        .setAccessToken(user.accessToken)
        .setGithubAccessToken(user.githubAccessToken)
        .setUserId(user.id);

      if (get().defaultProjectName === null || get().projectName === null) {
        return;
      }

      if (projectName === "") {
        set({ projectName, isProjectNameAvailable: true });
        return;
      }

      set({ projectName });

      try {
        const project = await api.getProject(projectName);
        set({ isProjectNameAvailable: !project });
      } catch (error) {
        set({ isProjectNameAvailable: false });
      }
    },
  },
}));

export const useDefaultProjectName = () =>
  useProjectNameStore((state: ProjectNameStore) => state.defaultProjectName);

export const useProjectName = () =>
  useProjectNameStore((state: ProjectNameStore) => state.projectName);

export const useIsProjectNameAvailable = () =>
  useProjectNameStore(
    (state: ProjectNameStore) => state.isProjectNameAvailable,
  );

export const useProjectNameActions = () =>
  useProjectNameStore((state: ProjectNameStore) => state.actions);
