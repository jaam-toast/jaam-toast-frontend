import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CheckDeleteBox, SelectBox } from "../@shared";
import {
  useCheckboxState,
  useDeleteProjectOptionMutation,
  useSetCheckboxState,
  useSetConfirmModal,
} from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { WebhookList } from "./WebhookList";
import { ContentsListSkeleton } from "../ProjectContents/ContentsList";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import * as css from "./index.css";

import type { OrderMode } from "../@types/cms";
import type { Webhook } from "../@types/cms";

export function ProjectWebhook() {
  const navigate = useNavigate();
  const { userName, projectName } = useParams();
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  const { openConfirm } = useSetConfirmModal();
  const { values: checkboxValues } = useCheckboxState();
  const { reset: resetCheckbox } = useSetCheckboxState();

  if (!userName || !projectName) {
    throw new NotFoundError("projectName, userName not found");
  }

  const deleteWebhooks = useDeleteProjectOptionMutation();

  const handleNewClick = () => {
    navigate("new");
  };

  const handleDeleteClick = (webhookList: string[]) => {
    const webhooks = webhookList.map(value => JSON.parse(value) as Webhook);

    openConfirm({
      message: `Do you want to delete webhooks?`,
      onConfirm: async () => {
        await deleteWebhooks.mutateAsync({
          projectName,
          option: {
            webhook: webhooks,
          },
        });

        resetCheckbox();
      },
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
      <div className={css.optionBoxWrapper}>
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
      </div>
      <AsyncBoundary suspenseFallback={<ContentsListSkeleton />}>
        <WebhookList
          projectName={projectName}
          orderOption={orderMode}
          onDelete={handleDeleteClick}
        />
      </AsyncBoundary>
    </section>
  );
}
