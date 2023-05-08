import { create } from "zustand";
import { shallow } from "zustand/shallow";
import toPairs from "lodash/toPairs";

import type { Webhook, WebhookForEditing } from "../@types/cms";
import type { WebhookData } from "../@types/api";

type WebhookStore = WebhookState & {
  actions: {
    setWebhook: ({ name, url }: { name?: string; url?: string }) => void;
    setWebhookList: (webhook: WebhookData) => void;
    reset: () => void;
  };
};

type WebhookState = {
  webhookList: WebhookForEditing[];
  webhook: Webhook;
  webhookErrorMessage: {
    name: string;
    url: string;
    events?: Set<string>;
  };
};

const initialState: WebhookState = {
  webhookList: [],
  webhook: {
    name: "",
    url: "",
  },
  webhookErrorMessage: {
    name: "",
    url: "",
  },
};

export const useWebhookStore = create<WebhookStore>((set, get) => ({
  ...initialState,

  actions: {
    setWebhook: ({ name, url }) => {
      set(state => ({
        webhook: {
          ...state.webhook,
          ...(name && { name }),
          ...(url && { url }),
        },
      }));
    },
    setWebhookList: webhook => {
      const webhookData = toPairs(webhook).reduce(
        (webhookData: WebhookForEditing[], [event, userDataArr]) => {
          const newWebhookData = [...webhookData];

          if (userDataArr.length) {
            userDataArr.forEach(
              userData =>
                newWebhookData
                  .find(data => data.name === userData.name)
                  ?.events.add(event) ||
                newWebhookData.push({
                  ...userData,
                  events: new Set<string>().add(event),
                }),
            );
          }

          return newWebhookData;
        },
        [],
      );

      set({ webhookList: webhookData });
    },
    reset: () => set(initialState),
  },
}));

export const useWebhookState = () =>
  useWebhookStore(state => state.webhook, shallow);

export const useWebhookListState = () =>
  useWebhookStore(state => state.webhookList, shallow);

export const useSetWebhook = () =>
  useWebhookStore(state => state.actions.setWebhook);

export const useSetWebhookList = () =>
  useWebhookStore(state => state.actions.setWebhookList);

export const useResetWebhook = () =>
  useWebhookStore(state => state.actions.reset);
