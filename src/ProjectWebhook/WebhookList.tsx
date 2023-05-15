import { useEffect } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Checkbox } from "../@shared";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import { useIsWebhookChangedState, useProjectQuery } from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import * as css from "./WebhookList.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent, OrderMode } from "../@types/cms";
import type { Webhook } from "../@types/cms";

export function WebhookList({
  projectName,
  orderOption,
  onDelete,
}: {
  projectName: string;
  orderOption: OrderMode;
  onDelete: (webhookList: string[]) => void;
}) {
  const navigate = useNavigate();
  const isWebhookChanged = useIsWebhookChangedState();
  const { data: project } = useProjectQuery(projectName);
  const queryClient = useQueryClient();

  if (!project || !project.webhookList) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_DATA);
  }

  const webhookList = project.webhookList;

  useEffect(() => {
    if (isWebhookChanged) {
      queryClient.invalidateQueries(["project", projectName]);
    }
  }, [isWebhookChanged]);

  const handleEditClick = (webhook: Webhook) => {
    if (!webhook.webhookId) {
      return;
    }

    navigate(webhook.webhookId);
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={`${css.th}`}>
            <Checkbox
              isParent={true}
              valuesList={webhookList.map(webhook =>
                JSON.stringify({
                  name: webhook.name,
                  url: webhook.url,
                  events: webhook.events,
                }),
              )}
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
          data: webhookList,
          fieldName: "name",
        }).map((webhook, index) => (
          <tr key={webhook.name + index} className={css.row}>
            <td className={css.checkboxField}>
              <Checkbox
                value={JSON.stringify({
                  name: webhook.name,
                  url: webhook.url,
                  events: webhook.events,
                })}
                valuesCount={webhookList.length}
              />
            </td>
            <td className={`${css.cell} ${css.nameCell}`}>{webhook.name}</td>
            <td className={`${css.cell} ${css.urlCell}`}>
              <div className={css.cellBox}>{webhook.url}</div>
            </td>
            <td className={`${css.cell} ${css.eventsCell}`}>
              <div className={css.eventsBox}>
                {webhook.events &&
                  webhook.events.map(event => (
                    <ul key={event}>
                      <li>{WEBHOOK_EVENTS_RECORD[event as WebhookEvent]}</li>
                    </ul>
                  ))}
              </div>
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
                    onDelete([
                      JSON.stringify({
                        name: webhook.name,
                        url: webhook.url,
                        events: webhook.events,
                      }),
                    ])
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
