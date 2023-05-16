import { create } from "zustand";
import isURL from "validator/lib/isURL";

import { getProject } from "../@utils/api";

import type { Webhook } from "../@types/cms";

type WebhookStore = {
  webhook: Webhook;
  webhookErrorMessage: {
    name: string;
    url: string;
  };
  isWebhookChanged: boolean;

  actions: {
    setWebhookName: (name: string, projectName: string) => void;
    setWebhookUrl: (url: string) => void;
    setWebhook: (webhook: Webhook) => void;
    setIsWebhookChanged: () => void;
    reset: () => void;
  };
};

const initialState: Omit<WebhookStore, "actions"> = {
  webhook: {
    name: "",
    url: "",
    events: [],
  },
  webhookErrorMessage: {
    name: "",
    url: "",
  },
  isWebhookChanged: false,
};

export const useWebhookStore = create<WebhookStore>((set, get) => ({
  ...initialState,

  actions: {
    setWebhookName: async (name, projectName) => {
      const project = await getProject(projectName);

      const isAvailableName = !project?.webhookList.some(
        webhookData => webhookData.name === name,
      );

      if (!isAvailableName) {
        set(state => ({
          webhookErrorMessage: {
            ...state.webhookErrorMessage,
            name: "Your webhook name is duplicated",
          },
        }));

        return;
      }

      if (get().webhookErrorMessage.name) {
        set(state => ({
          webhookErrorMessage: {
            ...state.webhookErrorMessage,
            name: "",
          },
        }));
      }

      set(state => ({
        webhook: {
          ...state.webhook,
          name,
        },
      }));
    },
    setWebhookUrl: url => {
      if (!isURL(url)) {
        set(state => ({
          webhookErrorMessage: {
            ...state.webhookErrorMessage,
            url: "The URL is not formatted correctly",
          },
        }));

        return;
      }

      if (get().webhookErrorMessage.url) {
        set(state => ({
          webhookErrorMessage: {
            ...state.webhookErrorMessage,
            url: "",
          },
        }));
      }

      set(state => ({
        webhook: {
          ...state.webhook,
          url,
        },
      }));
    },
    setWebhook: webhook => {
      set({ webhook });
    },
    setIsWebhookChanged: () => {
      set(state => ({ isWebhookChanged: !state.isWebhookChanged }));
    },
    reset: () => {
      set(initialState);
    },
  },
}));

export const useWebhookState = () => useWebhookStore(state => state.webhook);

export const useIsWebhookChangedState = () =>
  useWebhookStore(state => state.isWebhookChanged);

export const useWebhookErrorMessageState = () =>
  useWebhookStore(state => state.webhookErrorMessage);

export const useSetWebhook = () =>
  useWebhookStore(state => ({
    setWebhookName: state.actions.setWebhookName,
    setWebhookUrl: state.actions.setWebhookUrl,
    setWebhook: state.actions.setWebhook,
    reset: state.actions.reset,
    setIsWebhookChanged: state.actions.setIsWebhookChanged,
  }));
