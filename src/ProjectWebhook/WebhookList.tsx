import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "../@shared";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import { useSetWebhookList, useWebhookListState } from "../@hooks";
import * as css from "./WebhookList.css";

import { WEBHOOK_EVENTS_RECORD } from "../@types/cms";
import type { WebhookEvent, WebhookForEditing, OrderMode } from "../@types/cms";
import { WebhookData } from "../@types/api";
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

  // MOCK data
  const webhookListData: WebhookData = {
    UPDATE_BUILD: [
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog2",
        url: "https://my_blog_url",
      },
    ],
    CREATE_CONTENT: [
      {
        name: "my_web",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
    ],
    UPDATE_CONTENT: [
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
      {
        name: "my_blog",
        url: "https://my_blog_url",
      },
    ],
    DELETE_CONTENT: [
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

  const handleDeleteClick = (name: string) => {
    openConfirm({
      message: `Do you want to delete ${name} webhook?`,
      onConfirm: () => console.log("삭제로직 실행"),
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
              <Checkbox value={data.name} valuesCount={webhookList.length} />
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
                  onClick={() => handleDeleteClick(data.name)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
