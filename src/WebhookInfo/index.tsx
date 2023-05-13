import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useWebhookState,
  useCheckboxState,
  useUpdateProjectMutaion,
} from "../@hooks";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import { WebhookEditor } from "../ProjectWebhook/WebhookEditor";
import * as css from "./index.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent } from "../@types/cms";

export function WebhookInfo() {
  const navigate = useNavigate();
  const { projectName, webhookName } = useParams();
  const webhook = useWebhookState();
  const { values: checkboxValues } = useCheckboxState();
  const createWebhook = useUpdateProjectMutaion<"webhook">();

  if (!projectName || !webhookName) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
  }
  // TODO webhookName으로 webhook 데이터 찾는 것 추가

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
      <WebhookEditor title={`${webhook.name} webhook info`} />
    </div>
  );
}
