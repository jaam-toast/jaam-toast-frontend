import { useEffect } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "../@shared";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import {
  useDeleteProjectOptionMutation,
  useSetWebhookList,
  useWebhookListState,
  useSetConfirmModal,
  useProjectQuery,
  useSetWebhook,
} from "../@hooks";
import * as css from "./WebhookList.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent, OrderMode } from "../@types/cms";
import type { Webhook } from "../@types/cms";

export function WebhookList({
  projectName,
  orderOption,
}: {
  projectName: string;
  orderOption: OrderMode;
}) {
  const navigate = useNavigate();
  const { openConfirm } = useSetConfirmModal();
  const webhookList = useWebhookListState();
  const { setWebhook } = useSetWebhook();
  const setWebhookList = useSetWebhookList();
  const deleteWebhook = useDeleteProjectOptionMutation<"webhook">();
  const { data: project } = useProjectQuery(projectName);

  useEffect(() => {
    setWebhookList(project?.webhookList ?? []);
  }, []);

  const handleEditClick = (webhook: Webhook) => {
    setWebhook(webhook);
    navigate(webhook.name);
  };

  const handleDeleteClick = (webhook: Webhook) => {
    openConfirm({
      message: `Do you want to delete ${name} webhook?`,
      onConfirm: () => {
        deleteWebhook.mutate({
          projectName,
          option: {
            webhook,
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
        {sortBy<Webhook>({
          mode: orderOption,
          data: project?.webhookList ?? webhookList,
          fieldName: "name",
        }).map(webhook => (
          <tr key={webhook.name} className={css.row}>
            <td className={css.checkboxField}>
              <Checkbox
                value={JSON.stringify({
                  name: webhook.name,
                  url: webhook.url,
                  event: webhook.events,
                })}
                valuesCount={webhookList.length}
              />
            </td>
            <td className={css.cell}>
              <div>{webhook.name}</div>
            </td>
            <td className={css.cell}>
              <div>{webhook.url}</div>
            </td>
            <td className={css.cell}>
              {webhook.events &&
                webhook.events.map(event => (
                  <ul key={event}>
                    <li>{WEBHOOK_EVENTS_RECORD[event as WebhookEvent]}</li>
                  </ul>
                ))}
            </td>
            <td className={css.optionCell}>
              <div className={css.optionBox}>
                <BsFillPencilFill
                  className={css.optionIcon}
                  onClick={() => handleEditClick(webhook)}
                />
                <BsFillTrashFill
                  className={css.optionIcon}
                  onClick={() =>
                    handleDeleteClick({
                      name: webhook.name,
                      url: webhook.url,
                      events: webhook.events,
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
