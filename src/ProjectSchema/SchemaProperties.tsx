import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { TypeIcon } from "../@shared";
import * as css from "./SchemaProperties.css";

import type { Schema, Properties } from "../@types/schema";

type Options = {
  schema: Schema;
  editHandler: ({ propertyName }: { propertyName: string }) => void;
  deleteHandler: ({ propertyName }: { propertyName: string }) => void;
};

export function SchemaProperties({
  schema,
  editHandler,
  deleteHandler,
}: Options) {
  if (!Object.keys(schema.properties).length) {
    return null;
  }

  return (
    <>
      {Object.entries(schema.properties).map(
        ([propertyName, data]: [string, Properties]) => (
          <div className={css.field}>
            <div className={css.fieldTypeIcon}>
              <TypeIcon type={data.type === "string" ? "text" : data.type} />
            </div>
            <div className={css.fieldInfoWrapper}>
              <div>{propertyName}</div>
              <div className={css.fieldInfo}>
                <div>{data.type}</div>
                {schema.required && schema.required.includes(propertyName) && (
                  <div>required</div>
                )}
                {Object.entries(data).map(([key]) => (
                  <>{key !== "type" && <div>{key}</div>}</>
                ))}
              </div>
            </div>
            <div className={css.fieldEditButtons}>
              <BsFillPencilFill
                className={css.fieldEditButton}
                onClick={() => {
                  editHandler({ propertyName });
                }}
              />
              <BsFillTrashFill
                className={css.fieldEditButton}
                onClick={() => {
                  deleteHandler({ propertyName });
                }}
              />
            </div>
          </div>
        ),
      )}
    </>
  );
}
