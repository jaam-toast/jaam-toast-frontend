import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { TypeIcon } from "../@shared";
import * as css from "./SchemaProperties.css";

import type { Schema } from "../@types/schema";

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

  // TODO any type
  return (
    <>
      {Object.entries(schema.properties).map(([propertyName, data]: any) => (
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
                <>
                  {key === "min" && <div>min</div>}
                  {key === "max" && <div>max</div>}
                  {key === "minLength" && <div>minLength</div>}
                  {key === "maxLength" && <div>maxLength</div>}
                  {key === "minimum" && <div>minimum</div>}
                  {key === "maximum" && <div>maximum</div>}
                </>
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
      ))}
    </>
  );
}
