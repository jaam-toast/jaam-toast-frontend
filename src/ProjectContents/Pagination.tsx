import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import * as css from "./Pagination.css";

type PaginationProps = {
  page: number;
  pageLimit?: number;
  contentsLimit?: number;
  contentsCount: number;
  onClickPage: (page: number) => void;
};

export function Pagination({
  page,
  pageLimit = 5,
  contentsLimit = 20,
  contentsCount,
  onClickPage,
}: PaginationProps) {
  const totalPageCount = Math.ceil(contentsCount / contentsLimit);
  const offset = (Math.ceil(page / pageLimit) - 1) * pageLimit;

  const handleNextPageClick = () => {
    page + pageLimit > totalPageCount
      ? onClickPage(totalPageCount)
      : onClickPage(page + pageLimit);
  };

  const handlePrevPageClick = () => {
    page - pageLimit < 1 ? onClickPage(1) : onClickPage(page - pageLimit);
  };

  const handlePageNumberClick = (page: number) => {
    onClickPage(page);
  };

  return (
    <div className={css.paginationContainer}>
      <div
        className={`${css.paginationSideWrapper} ${
          page !== 1 ? "" : css.hidden
        }`}
      >
        <BsArrowLeftShort
          onClick={handlePrevPageClick}
          size={25}
          className={`${css.paginationArrow} ${css.paginationCell}`}
        />
        <span
          onClick={() => handlePageNumberClick(1)}
          className={css.paginationCell}
        >
          1
        </span>
        <span className={`${css.paginationCell}`}>・・・</span>
      </div>
      <div className={css.paginationNumberWrapper}>
        {[...new Array(pageLimit)]
          .filter((_, index) => offset + index < totalPageCount)
          .map((_, index) => (
            <span
              key={index + offset + 1}
              onClick={() => handlePageNumberClick(index + offset + 1)}
              className={`${css.paginationCell} ${
                index + offset + 1 === page ? css.paginationNumberPoint : ""
              }`}
            >
              {index + offset + 1}
            </span>
          ))}
      </div>
      <div
        className={`${css.paginationSideWrapper}  ${
          page !== totalPageCount ? "" : css.hidden
        }`}
      >
        <span className={`${css.paginationCell}`}>・・・</span>
        <span
          onClick={() => handlePageNumberClick(totalPageCount)}
          className={css.paginationCell}
        >
          {totalPageCount}
        </span>
        <BsArrowRightShort
          onClick={handleNextPageClick}
          size={25}
          className={`${css.paginationArrow} ${css.paginationCell}`}
        />
      </div>
    </div>
  );
}
