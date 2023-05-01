import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { useContentQuery } from "../@hooks";

import type { JsonSchema } from "@jaam-schema/src";
import { Navigate } from "react-router-dom";

export function TimeInfo({
  contentId,
  schema,
  token,
}: {
  contentId: string;
  schema: JsonSchema;
  token: string;
}) {
  const { data: content } = useContentQuery({
    schemaName: schema.title,
    token,
    contentId,
  });

  if (!content) {
    return <Navigate to="/error" />;
  }

  const { _createdAt, _updatedAt } = content;

  return (
    <>
      <div>
        <p>Created At</p>
        <div>{dayjs.utc(_createdAt).local().format("YYYY/MM/DD HH:mm a")}</div>
      </div>
      <div>
        <p>Updated At</p>
        <div>{dayjs.utc(_updatedAt).local().format("YYYY/MM/DD HH:mm a")}</div>
      </div>
    </>
  );
}
