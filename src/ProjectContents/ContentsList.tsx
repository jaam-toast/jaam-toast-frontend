import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { Checkbox } from "../@shared";
import { useContentsListQuery } from "../@hooks";
import { Pagination } from "./Pagination";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./ContentsList.css";

import type { Content } from "../@types/api";
import type { SortMode, OrderMode } from "../@types/cms";

type ContentsListProps = {
  token: string;
  schemaName: string;
  projectName: string;
  orderOption: OrderMode;
  sortOption: SortMode;
};

export function ContentsList({
  token,
  schemaName,
  orderOption,
  sortOption,
}: ContentsListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useContentsListQuery({
    schemaName,
    token,
    page,
    sort: sortOption,
    order: orderOption,
  });
  const contentsList = data?.contents;

  if (!schemaName || !contentsList) {
    return null;
  }

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
                isParent={true}
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
      </table>
      <Pagination
        page={page}
        contentsCount={contentsList?.length || 0}
        onClickPage={setPage}
      />
    </>
  );
}

export function ContentsListSkeleton() {
  return (
    <table className={css.table}>
      <tbody className={css.tbody}>
        {[...new Array(10)].map((_, index) => (
          <tr className={css.row} key={index}>
            <td className={css.cell}></td>
            <td className={css.cell}></td>
            <td className={css.cell}></td>
            <td className={css.cell}></td>
            <td className={css.cell}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
