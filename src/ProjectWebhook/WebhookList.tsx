import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "../@shared";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import {
  useDeleteProjectOptionMutation,
  useSetWebhookList,
  useWebhookListState,
} from "../@hooks";
import * as css from "./WebhookList.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent, WebhookForEditing, OrderMode } from "../@types/cms";
import { Webhook } from "../@types/api";
import { useSetConfirmModal } from "../@hooks";

export function WebhookList({
  projectName,
  orderOption,
}: {
  projectName: string;
  orderOption: OrderMode;
}) {
  const navigate = useNavigate();
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  // TODO query 적용
  // const { data: webhookListData } = useWebhookQuery(projectName);
  const setWebhookList = useSetWebhookList();
  const webhookList = useWebhookListState();
  const { openConfirm } = useSetConfirmModal();
  const deleteWebhook = useDeleteProjectOptionMutation<"webhook">();

  // MOCK data
  const webhookListData: Webhook = {
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

  useEffect(() => {
    setWebhookList(webhookListData);
  }, []);

  const handleEditClick = () => {
    navigate("new");
  };

  const handleDeleteClick = (webhook: WebhookForEditing) => {
    // TODO 중복 줄이기
    const newWebhook = {
      DEPLOYMENT_UPDATED: webhook.events.has("DEPLOYMENT_UPDATED")
        ? webhookListData.DEPLOYMENT_UPDATED.filter(
            data => data.name !== webhook.name,
          )
        : webhookListData.DEPLOYMENT_UPDATED,
      CONTENT_CREATED: webhook.events.has("CONTENT_CREATED")
        ? webhookListData.CONTENT_CREATED.filter(
            data => data.name !== webhook.name,
          )
        : webhookListData.CONTENT_CREATED,
      CONTENT_UPDATED: webhook.events.has("CONTENT_UPDATED")
        ? webhookListData.CONTENT_UPDATED.filter(
            data => data.name !== webhook.name,
          )
        : webhookListData.CONTENT_UPDATED,
      CONTENT_DELETED: webhook.events.has("CONTENT_DELETED")
        ? webhookListData.CONTENT_DELETED.filter(
            data => data.name !== webhook.name,
          )
        : webhookListData.CONTENT_DELETED,
    };

    openConfirm({
      message: `Do you want to delete ${name} webhook?`,
      onConfirm: async () => {
        await deleteWebhook.mutateAsync({
          projectName,
          option: {
            webhook: newWebhook,
          },
        });
      },
    });
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={`${css.th}`}>
            <Checkbox
              isParent={true}
              valuesList={webhookList.map(data => data.name)}
            />
          </th>
          <th className={css.th}>Name</th>
          <th className={css.th}>URL</th>
          <th className={css.th}>Events</th>
          <th className={css.th}>
            <div className={css.optionBox}>Option</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortBy<WebhookForEditing>({
          mode: orderOption,
          data: webhookList,
          fieldName: "name",
        }).map(data => (
          <tr key={data.name} className={css.row}>
            <td className={css.checkboxField}>
              <Checkbox
                value={JSON.stringify({
                  name: data.name,
                  url: data.url,
                  event: data.events,
                })}
                valuesCount={webhookList.length}
              />
            </td>
            <td className={css.cell}>
              <div>{data.name}</div>
            </td>
            <td className={css.cell}>
              <div>{data.url}</div>
            </td>
            <td className={css.cell}>
              {[...data.events].map(event => (
                <ul key={event}>
                  <li>{WEBHOOK_EVENTS_RECORD[event as WebhookEvent]}</li>
                </ul>
              ))}
            </td>
            <td className={css.optionCell}>
              <div className={css.optionBox}>
                <BsFillPencilFill
                  className={css.optionIcon}
                  onClick={handleEditClick}
                />
                <BsFillTrashFill
                  className={css.optionIcon}
                  onClick={() =>
                    handleDeleteClick({
                      name: data.name,
                      url: data.url,
                      events: data.events,
                    })
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
