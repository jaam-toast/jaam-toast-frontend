import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Checkbox } from "../@shared";
import { Pagination } from "./Pagination";
import { useContentsListQuery } from "../@hooks";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./ContentsList.css";

import type { Content } from "../@types/api";
import type { SortMode, OrderMode } from "../@types/cms";

type ContentsListProps = {
  schemaName: string | null;
  token: string;
  orderOption: OrderMode;
  sortOption: SortMode;
};

export function ContentsList({
  schemaName,
  token,
  orderOption,
  sortOption,
}: ContentsListProps) {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  if (!schemaName) {
    return null;
  }

  const { data } = useContentsListQuery({
    schemaName: schemaName,
    token,
    page,
    sort: sortOption,
    order: orderOption,
  });
  const contentsList = data?.contents;
  const contentsCount = data?.totalCounts;

  const handleContentClick = ({ id }: { id: string }) => {
    navigate(`${schemaName}/${id}`);
  };

  return (
    <>
      <table className={css.table}>
        <thead>
          <tr>
            <th className={css.thCheckbox}>
              <Checkbox
                value="checkbox-parent"
                valuesList={
                  contentsList && contentsList.length
                    ? contentsList.map(data => data._id)
                    : []
                }
              />
            </th>
            <th className={css.th}>Id</th>
            <th className={css.th}>Schema Type</th>
            <th className={css.th}>Created At</th>
            <th className={css.th}>Updated At</th>
          </tr>
        </thead>
        {schemaName && contentsList && (
          <tbody className={css.tbody}>
            {sortBy<any>({
              mode: orderOption,
              data: contentsList,
              fieldName: "schemaName",
            }).map((data: Content, index: number) => (
              <tr className={css.row} key={data._id}>
                <td className={css.cell}>
                  <div className={css.checkboxField}>
                    <Checkbox
                      value={data._id}
                      valuesCount={contentsList?.length}
                    />
                  </div>
                </td>
                <td className={css.cell}>
                  <div
                    onClick={() => handleContentClick({ id: data._id })}
                    className={css.nameField}
                  >
                    <span>{data._id}</span>
                  </div>
                </td>
                <td className={css.cell}>
                  <div className={css.typeField}>{schemaName}</div>
                </td>
                <td className={css.cell}>
                  {dayjs
                    .utc(data._createdAt)
                    .local()
                    .format("YYYY/MM/DD HH:mm a")}
                </td>
                <td className={css.cell}>
                  {dayjs
                    .utc(data._updatedAt)
                    .local()
                    .format("YYYY/MM/DD HH:mm a")}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <Pagination
        page={page}
        contentsCount={contentsCount || 0}
        onClickPage={setPage}
      />
    </>
  );
}
