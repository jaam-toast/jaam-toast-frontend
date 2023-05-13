import { create } from "zustand";
import isURL from "validator/lib/isURL";

import type { Webhook } from "../@types/cms";

type WebhookStore = {
  webhookList: Webhook[];
  webhook: Webhook;
  webhookErrorMessage: {
    name: string;
    url: string;
  };

  actions: {
    setWebhookName: (name: string) => void;
    setWebhookUrl: (url: string) => void;
    setWebhook: (webhook: Webhook) => void;
    setWebhookList: (webhookList: Webhook[]) => void;
    reset: () => void;
  };
};

const initialState: Omit<WebhookStore, "actions"> = {
  webhookList: [],
  webhook: {
    name: "",
    url: "",
    events: [],
  },
  webhookErrorMessage: {
    name: "",
    url: "",
  },
};

export const useWebhookStore = create<WebhookStore>((set, get) => ({
  ...initialState,

  actions: {
    setWebhookName: name => {
      // TODO name 중복 검사 추가
      if (name) {
        // TODO 중복시 에러메시지 설정
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
    setWebhookList: webhookList => {
      set({ webhookList });
    },
    reset: () => set(initialState),
  },
}));

export const useWebhookState = () => useWebhookStore(state => state.webhook);

export const useWebhookListState = () =>
  useWebhookStore(state => state.webhookList);

export const useWebhookErrorMessageState = () =>
  useWebhookStore(state => state.webhookErrorMessage);

export const useSetWebhook = () =>
  useWebhookStore(state => ({
    setWebhookName: state.actions.setWebhookName,
    setWebhookUrl: state.actions.setWebhookUrl,
    setWebhook: state.actions.setWebhook,
  }));

export const useSetWebhookList = () =>
  useWebhookStore(state => state.actions.setWebhookList);

export const useResetWebhook = () =>
  useWebhookStore(state => state.actions.reset);
