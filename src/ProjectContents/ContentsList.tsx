import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { Checkbox } from "../@shared";
import {
  useContentsListQuery,
  useContentsState,
  useSetContentsState,
} from "../@hooks";

import { Pagination } from "./Pagination";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./ContentsList.css";

import type { Content } from "../@types/cms";
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
  const { isContentChanged } = useContentsState();
  const { setIsContentChanged } = useSetContentsState();
  const pageLength = 10;
  const { data, refetch } = useContentsListQuery({
    schemaName,
    token,
    page,
    pageLength,
    sort: sortOption,
    order: orderOption,
  });
  const queryClient = useQueryClient();

  const contentsList = data?.contents;
  const contentsCount = data?.totalCounts;

  useEffect(() => {
    if (isContentChanged) {
      queryClient.invalidateQueries([
        "contentsList",
        schemaName,
        sortOption,
        orderOption,
      ]);
      refetch();
      setIsContentChanged();
    }
  }, [isContentChanged]);

  const handleContentClick = ({ id }: { id: string }) => {
    navigate(`${schemaName}/${id}`);
  };

  return (
    <>
      <div className={css.container}>
        <table className={css.table}>
          <thead>
            <tr>
              <th className={css.th}>
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
            {sortBy<Content>({
              mode: orderOption,
              data: contentsList ?? [],
              fieldName: "schemaName",
            }).map((data: Content, index: number) => (
              <tr className={css.row} key={data._id}>
                <td className={css.checkboxField}>
                  <Checkbox
                    value={data._id}
                    valuesCount={contentsList?.length}
                  />
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
      </div>
      <Pagination
        page={page}
        contentsLimit={pageLength}
        contentsCount={contentsCount || 0}
        onClickPage={setPage}
      />
    </>
  );
}

export function ContentsListSkeleton() {
  return (
    <table className={css.tbodySkeleton}>
      <tbody className={css.tbody}>
        {[...new Array(10)].map((_, index) => (
          <tr className={css.row} key={index}>
            <td className={css.cellSkeleton}>
              <div className={css.nameField}>
                <div className={css.textSkeleton} />
              </div>
            </td>
            <td className={css.cellSkeleton}>
              <div className={css.nameField}>
                <div className={css.textSkeleton} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
