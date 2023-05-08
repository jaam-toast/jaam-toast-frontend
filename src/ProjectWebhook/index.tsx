import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CheckDeleteBox, SelectBox } from "../@shared";
import { useCheckboxState, useSetConfirmModal } from "../@hooks";
import { ValidationError } from "../@utils/createError";
import { WebhookList } from "./WebhookList";
import * as css from "./index.css";

import type { OrderMode } from "../@types/cms";

export function ProjectWebhook() {
  const navigate = useNavigate();
  const { userName, projectName } = useParams();
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  const { values: checkboxValues } = useCheckboxState();
  const { openConfirm } = useSetConfirmModal();

  if (!projectName || !userName) {
    throw new ValidationError("projectName, userName not found");
  }

  const handleNewClick = () => {
    navigate("new");
  };

  const handleDeleteClick = (webhook: string[]) => {
    openConfirm({
      message: `Do you want to delete ${webhook.join(", ")} webhooks?`,
      onConfirm: () => console.log("삭제 로직 실행"),
    });
  };

  return (
    <section className={css.container}>
      <header className={css.header}>
        <div>
          <h2>Webhook</h2>
          <div className={css.headerDescriptionBox}>
            <span className={css.headerDescription}>
              A Webhook is a way to monitor changes that occur within a project
              and notify a specified URL of an event when it occurs.
            </span>
            <br />
          </div>
        </div>
        <button onClick={handleNewClick} className={css.newButton}>
          + New Webhook
        </button>
      </header>
      <details className={css.subDescriptionToggle}>
        <summary>Learn more about webhooks</summary>
        <img
          className={css.subDescriptionImg}
          src="/images/webhook-description.png"
          width="740"
          height="360"
          alt="webhook"
        />
        <div className={css.subDescription}>
          With webhooks, when a change happens, an alert is automatically sent
          to the designated URL for processing.
          <br />
          For example, if new content is created or existing content is updated
          or deleted, you can use a Webhook to detect and process these changes.
        </div>
      </details>
      <div className={css.optionBox}>
        {checkboxValues.size ? (
          <CheckDeleteBox onDelete={handleDeleteClick} />
        ) : (
          <div className={css.optionBox}>
            <SelectBox
              options={["ascending", "descending"]}
              defaultSelect={"ascending"}
              onSelectionChange={setOrderMode}
              label={"Order"}
            />
          </div>
        )}
      </div>
      <WebhookList projectName={projectName} orderOption={orderMode} />
    </section>
  );
}
