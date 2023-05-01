import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { TypeIcon } from "../@shared";
import * as css from "./PropertyList.css";

import type { JaamSchema, JaamSchemaProperties } from "@jaam-schema/src";

type SchemaPropertiesProps = {
  isEditable?: boolean;
  propertyList: JaamSchema["properties"];
  editHandler: ({ propertyName }: { propertyName: string }) => void;
  deleteHandler: ({ propertyName }: { propertyName: string }) => void;
};

export function PropertyList({
  isEditable = true,
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
        ([propertyName, data]: [string, JaamSchemaProperties]) => (
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
            {isEditable && (
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
            )}
          </div>
        ),
      )}
    </>
  );
}
