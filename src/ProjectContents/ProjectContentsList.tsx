import { Navigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

import {
  useCheckboxState,
  useSetCheckboxState,
} from "../@shared/useCheckboxStore";
import { useModal } from "../@shared";
import { useContentsListQuery } from "./useContentsQuery";
import { useDeleteContentsMutation } from "./useContentsMutation";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./ProjectContentsList.css";

import type { JsonSchema } from "../@packages/json-schema-to-jaam-schema/types";
import type { Content } from "../@types/api";
import type { SortMode, OrderMode } from "../@types/cms";

type ProjectContentsListProps = {
  schema: JsonSchema;
  token: string;
  orderOption: OrderMode;
  sortOption: SortMode;
  searchword: string;
};

export function ProjectContentsList({
  schema,
  token,
  orderOption,
  sortOption,
  searchword,
}: ProjectContentsListProps) {
  const { openModal } = useModal();
  const { values: checkedContentsId, isAllChecked } = useCheckboxState();
  const { toggleAllChecked, setValue: setCheckboxValue } =
    useSetCheckboxState();
  const { data: contentsList } = useContentsListQuery({
    schemaName: schema.title,
    token,
    page: 1,
    sort: sortOption,
    order: orderOption,
  });

  if (!contentsList) {
    return <Navigate to="/error" />;
  }

  const deleteContents = useDeleteContentsMutation({
    onSuccess: () => {
      alert("Success contents delete");
    },
    onError: () => {
      alert("Failed to delete contents. Please try again.");
    },
  });

  const handleContentClick = ({ index }: { index: number }) => {
    // TODO contents info page
  };

  const handleDelete = ({ contentIds }: { contentIds: string[] }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteContents.mutate({
        token,
        schemaName: schema.title,
        contentIds,
      });
    }
  };

  return (
    <>
      {!!checkedContentsId.size && (
        <div className={css.selectOptionField}>
          <div>{`${checkedContentsId.size} selected`}</div>
          <BsFillTrashFill
            onClick={() => handleDelete({ contentIds: [...checkedContentsId] })}
            className={css.optionIcon}
          />
        </div>
      )}
      <table className={css.table}>
        <thead>
          <tr>
            <th className={css.thCheckbox}>
              <input
                type="checkbox"
                value="checkbox-parent"
                checked={isAllChecked}
                // TODO
                onChange={() =>
                  toggleAllChecked(contentsList.map(data => data._id))
                }
              />
            </th>
            <th className={css.th}>Id</th>
            <th className={css.th}>Schema Type</th>
            <th className={css.th}>Created At</th>
            <th className={css.th}>Updated At</th>
          </tr>
        </thead>
        <tbody className={css.tbody}>
          {sortBy<any>({
            mode: orderOption,
            data: contentsList,
            fieldName: "schemaName",
          }).map((data: Content, index: number) => (
            <tr className={css.row} key={data._id}>
              <td className={css.cell}>
                <div className={css.checkboxField}>
                  <input
                    type="checkbox"
                    value={data._id}
                    checked={isAllChecked || checkedContentsId.has(data._id)}
                    onChange={e => setCheckboxValue(e.target.value)}
                  />
                </div>
              </td>
              <td className={css.cell}>
                <div
                  onClick={() => handleContentClick({ index })}
                  className={css.nameField}
                >
                  <span>{data._id}</span>
                </div>
              </td>
              <td className={css.cell}>
                <div className={css.typeField}>{schema.title}</div>
              </td>
              <td className={css.cell}>04/18/2023 7:19 AM</td>
              <td className={css.cell}>04/18/2023 7:19 AM</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
