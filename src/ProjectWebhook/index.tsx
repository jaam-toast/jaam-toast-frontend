import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CheckDeleteBox, SelectBox } from "../@shared";
import {
  useCheckboxState,
  usePutProjectMutaion,
  useSetConfirmModal,
} from "../@hooks";
import { ValidationError } from "../@utils/createError";
import { WebhookList } from "./WebhookList";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { ContentsListSkeleton } from "../ProjectContents/ContentsList";
import * as css from "./index.css";

import type { OrderMode, WebhookEvent, WebhookForEditing } from "../@types/cms";
import { WebhookData } from "src/@types/api";

export function ProjectWebhook() {
  const navigate = useNavigate();
  const { userName, projectName } = useParams();
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  const { values: checkboxValues } = useCheckboxState();
  const { openConfirm } = useSetConfirmModal();

  if (!userName || !projectName) {
    throw new ValidationError("projectName, userName not found");
  }

  // mock data
  const webhookListData: WebhookData = {
    DEPLOYMENT_UPDATED: [
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog2",
        url: "https://my_blog_url",
      },
    ],
    CONTENT_CREATED: [
      {
        name: "my_web",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
    ],
    CONTENT_UPDATED: [
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
    ],
    CONTENT_DELETED: [
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
    ],
  };

  const deleteWebhooks = usePutProjectMutaion();

  const handleNewClick = () => {
    navigate("new");
  };

  // TODO error
  // TODO webhooks 삭제 데이터 필터링 타입 개선
  const handleDeleteClick = (webhook: string[]) => {
    const copyWebhookList = { ...webhookListData };

    webhook.forEach(data => {
      const objData: WebhookForEditing = JSON.parse(data);
      const arr = [...objData.events];
      arr.forEach((event: WebhookEvent) => {
        copyWebhookList[event] = copyWebhookList[event].filter(
          originalData => originalData.name !== objData.name,
        );
      });
    });
    // TODO JSON parse
    openConfirm({
      message: `Do you want to delete ${webhook.join(", ")} webhooks?`,
      onConfirm: async () => {
        await deleteWebhooks.mutateAsync({
          projectName,
          option: {
            webhook: copyWebhookList,
          },
        });
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
      <AsyncBoundary suspenseFallback={<ContentsListSkeleton />}>
        <WebhookList projectName={projectName} orderOption={orderMode} />
      </AsyncBoundary>
    </section>
  );
}
