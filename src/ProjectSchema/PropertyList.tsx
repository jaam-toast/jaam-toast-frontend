import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { TypeIcon } from "../@shared";
import { JaamSchema, JaamSchemaProperties } from "@jaam-schema/src";
import * as css from "./SchemaProperties.css";

type SchemaPropertiesProps = {
  propertyList: JaamSchema["properties"];
  editHandler: ({ propertyName }: { propertyName: string }) => void;
  deleteHandler: ({ propertyName }: { propertyName: string }) => void;
};

export function PropertyList({
  propertyList,
  editHandler,
  deleteHandler,
}: SchemaPropertiesProps) {
  if (!Object.keys(propertyList).length) {
    return null;
  }

  return (
    <>
      {Object.entries(propertyList).map(
        ([propertyName, data]: [string, JaamSchemaProperties]) => {
          console.log({ data });
          return (
            <div className={css.field}>
              <div className={css.fieldTypeIcon}>
                <TypeIcon type={data.type} />
              </div>
              <div className={css.fieldInfoWrapper}>
                <div>{propertyName}</div>
                <div className={css.fieldInfo}>
                  <div>{data.type}</div>
                  {Object.entries(data).map(([options, value]) => (
                    <>
                      {options !== "type" && value !== false && (
                        <div>{options}</div>
                      )}
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
          );
        },
      )}
    </>
  );
}
