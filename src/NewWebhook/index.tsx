import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useWebhookState,
  useCheckboxState,
  useUpdateProjectMutaion,
} from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import { WebhookEditor } from "../ProjectWebhook/WebhookEditor";
import * as css from "./index.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent } from "../@types/cms";

export function NewWebhook() {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const { values: checkboxValues } = useCheckboxState();
  const webhook = useWebhookState();
  const createWebhook = useUpdateProjectMutaion<"webhook">();

  if (!projectName) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
  }

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {
    const hasInvalidEvent = !![...checkboxValues].filter(
      t => !WEBHOOK_EVENTS_RECORD[t as WebhookEvent],
    ).length;

    if (
      !webhook.name ||
      !webhook.url ||
      !checkboxValues.size ||
      hasInvalidEvent
    ) {
      toast.error("The request field is invalid, please check.");
    }

    createWebhook.mutate({
      projectName,
      option: {
        webhook: { ...webhook, events: [...checkboxValues] as WebhookEvent[] },
      },
    });
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <button
          onClick={handlePrevClick}
          className={`${css.button} ${css.prevButton}`}
        >
          Prev
        </button>
        <button
          onClick={handleSaveClick}
          className={`${css.button} ${css.saveButton}`}
        >
          + Save
        </button>
      </header>
      <WebhookEditor title="Create new Webhook" />
    </div>
  );
}
