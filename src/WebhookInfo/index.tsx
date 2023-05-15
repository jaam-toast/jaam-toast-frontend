import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import keys from "lodash/keys";

import {
  useWebhookState,
  useCheckboxState,
  useUpdateWebhookMutaion,
  useSetWebhook,
  useProjectQuery,
  useSetCheckboxState,
  useWebhookErrorMessageState,
} from "../@hooks";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import { WebhookEditor } from "../ProjectWebhook/WebhookEditor";
import * as css from "./index.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent } from "../@types/cms";

export function WebhookInfo() {
  const navigate = useNavigate();
  const { projectName, webhookId } = useParams();
  const { values: checkboxValues } = useCheckboxState();
  const { setCheckboxValue } = useSetCheckboxState();
  const webhook = useWebhookState();
  const warningMessage = useWebhookErrorMessageState();
  const {
    setWebhook,
    reset: resetWebhookState,
    setIsWebhookChanged,
  } = useSetWebhook();
  const updateWebhook = useUpdateWebhookMutaion();

  if (!projectName || !webhookId) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
  }

  const { data: project } = useProjectQuery(projectName);

  useEffect(() => {
    const currentWebhook = project?.webhookList?.find(
      webhook => webhook.webhookId === webhookId,
    ) ?? {
      name: "",
      events: [],
      url: "",
    };

    currentWebhook.events.forEach(event => {
      setCheckboxValue({
        value: event,
        checkboxCount: keys(WEBHOOK_EVENTS_RECORD).length,
        isInitialize: true,
      });
    });
    setWebhook(currentWebhook);
  }, []);

  const handlePrevClick = () => {
    navigate(-1);
    resetWebhookState();
  };

  const handleSaveClick = async () => {
    if (
      !webhook.name ||
      !webhook.url ||
      !checkboxValues.size ||
      !warningMessage.name ||
      !warningMessage.url
    ) {
      toast.error("The request field is invalid, please check.");
    }

    await updateWebhook.mutateAsync({
      projectName,
      option: {
        ...webhook,
        webhookId,
        events: [...checkboxValues] as WebhookEvent[],
      },
    });

    navigate(-1);
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
      <WebhookEditor
        title={`${webhook.name} webhook info`}
        projectName={projectName}
      />
    </div>
  );
}
