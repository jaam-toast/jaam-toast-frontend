import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useWebhookState,
  useCheckboxState,
  useAddProjectOptionMutaion,
  useSetWebhook,
  useWebhookErrorMessageState,
} from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import { WebhookEditor } from "../ProjectWebhook/WebhookEditor";
import * as css from "./index.css";

import type { WebhookEvent } from "../@types/cms";

export function NewWebhook() {
  const navigate = useNavigate();
  const { userName, projectName } = useParams();
  const { values: checkboxValues } = useCheckboxState();
  const webhook = useWebhookState();
  const warningMessage = useWebhookErrorMessageState();
  const { reset: resetWebhookState, setIsWebhookChanged } = useSetWebhook();
  const createWebhook = useAddProjectOptionMutaion();

  if (!projectName) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
  }

  const handlePrevClick = () => {
    navigate(-1);
    resetWebhookState();
  };

  const handleSaveClick = async () => {
    console.log({ webhook, checkboxValues, warningMessage });
    if (
      !webhook.name ||
      !webhook.url ||
      !checkboxValues.size ||
      warningMessage.name ||
      warningMessage.url
    ) {
      return toast.error("The request field is invalid, please check.");
    }

    await createWebhook.mutateAsync({
      projectName,
      option: {
        webhook: { ...webhook, events: [...checkboxValues] as WebhookEvent[] },
      },
    });

    navigate(`/${userName}/${projectName}/webhook`);
    resetWebhookState();
    setIsWebhookChanged();
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
      <WebhookEditor title="Create new Webhook" projectName={projectName} />
    </div>
  );
}
