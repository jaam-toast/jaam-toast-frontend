import { Suspense, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { ColorBox, Checkbox } from "../@shared";
import { useModal, useProjectQuery } from "../@hooks";
import { ModalSchemaInfo, ModalSchemaInfoSkeleton } from "./ModalSchemaInfo";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./SchemaList.css";

import type { JsonSchema } from "@jaam-schema/src";
import type { SchemaData } from "../@types/api";
import type { OrderMode } from "../@types/cms";

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

  const { schemaList: schemaListData, storageKey } = data;
  const schemaList = useMemo(
    () =>
      sortBy<SchemaData>({
        mode: orderOption,
        data: schemaListData,
        fieldName: "schemaName",
      }).filter((data: SchemaData) =>
        searchword ? data.schema.title.includes(searchword) : true,
      ),
    [orderOption, schemaListData, searchword],
  );

  const handleSchemaClick = ({ schema }: { schema: JsonSchema }) => {
    openModal({
      component: (
        <Suspense fallback={<ModalSchemaInfoSkeleton />}>
          <ModalSchemaInfo
            currentSchema={schema}
            projectName={projectName}
            token={storageKey}
          />
        </Suspense>
      ),
    });
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={`${css.thCheckbox}`}>
            <Checkbox
              isParent={true}
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
        {schemaList.map((data: SchemaData) => (
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
                <span className={css.schemaName}>{data.schema.title}</span>
              </div>
            </td>
            <td className={css.cell}>
              <div className={css.typeField}>
                {Object.keys(data.schema.properties).map((property: string) => (
                  <span className={css.type} key={property}>
                    {property}
                  </span>
                ))}
              </div>
            </td>
            <td className={css.cell}>
              <div className={css.optionField}>
                <BsFillPencilFill
                  onClick={() => handleSchemaClick({ schema: data.schema })}
                  className={css.optionIcon}
                />
                <BsFillTrashFill
                  onClick={() => onDelete({ schemaNames: [data.schema.title] })}
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

export function SchemaListSkeleton() {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={css.th}></th>
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {[...new Array(10)].map((_, index) => (
          <tr className={css.row} key={index}>
            <td className={css.cell}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
