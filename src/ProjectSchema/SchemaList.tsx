import { Navigate } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { ColorBox, useModal, Checkbox, useProjectQuery } from "../@shared";
import { ModalSchemaInfo } from "./ModalSchemaInfo";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./SchemaList.css";

import type { SchemaData } from "../@types/api";
import type { OrderMode } from "../@types/cms";
import type { JsonSchema } from "@jaam-schema/src";

type SchemaListProps = {
  projectName: string;
  orderOption: OrderMode;
  searchword?: string;
  onDelete: ({ schemaNames }: { schemaNames: string[] }) => void;
};

export function SchemaList({
  projectName,
  orderOption,
  searchword,
  onDelete,
}: SchemaListProps) {
  const { openModal } = useModal();

  const { data } = useProjectQuery(projectName);

  if (!data) {
    return <Navigate to="/error" />;
  }

  const { schemaList, storageKey } = data;

  const handleSchemaClick = ({ schema }: { schema: JsonSchema }) => {
    openModal({
      component: (
        <ModalSchemaInfo
          currentSchema={schema}
          projectName={projectName}
          token={storageKey}
        />
      ),
    });
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={`${css.thCheckbox}`}>
            <Checkbox
              value="checkbox-parent"
              valuesList={schemaList.map(data => data.schema.title)}
            />
          </th>
          <th className={css.th}>Name</th>
          <th className={css.th}>Field</th>
          <th className={css.th}>
            <div className={css.optionField}>Option</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortBy<SchemaData>({
          mode: orderOption,
          data: schemaList,
          fieldName: "schemaName",
        })
          .filter((data: SchemaData) =>
            searchword ? data.schema.title.includes(searchword) : true,
          )
          .map((data: SchemaData, index: number) => (
            <tr className={css.row} key={data.schema.title}>
              <td className={css.cell}>
                <div className={css.checkboxField}>
                  <Checkbox
                    value={data.schema.title}
                    valuesCount={schemaList.length}
                  />
                </div>
              </td>
              <td className={css.cell}>
                <div
                  onClick={() => handleSchemaClick({ schema: data.schema })}
                  className={css.nameField}
                >
                  <ColorBox randomColor={true}>
                    <span>{data.schema.title[0].toUpperCase()}</span>
                  </ColorBox>
                  <span>{data.schema.title}</span>
                </div>
              </td>
              <td className={css.cell}>
                <div className={css.typeField}>
                  {Object.keys(data.schema.properties).map(
                    (property: string) => (
                      <span className={css.type} key={property}>
                        {property}
                      </span>
                    ),
                  )}
                </div>
              </td>
              <td className={css.cell}>
                <div className={css.optionField}>
                  <BsFillPencilFill
                    onClick={() => handleSchemaClick({ schema: data.schema })}
                    className={css.optionIcon}
                  />
                  <BsFillTrashFill
                    onClick={() =>
                      onDelete({ schemaNames: [data.schema.title] })
                    }
                    className={css.optionIcon}
                  />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
