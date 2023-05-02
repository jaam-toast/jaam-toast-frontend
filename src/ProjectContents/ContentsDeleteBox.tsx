import { BsFillTrashFill } from "react-icons/bs";

import { useProjectQuery, useCheckboxState } from "../@hooks";
import * as css from "./index.css";

export function ContentsDeleteBox({
  projectName,
  onDelete,
}: {
  projectName: string;
  onDelete: ({
    contentIds,
    token,
  }: {
    contentIds: string[];
    token: string;
  }) => void;
}) {
  const { values: checkboxValues } = useCheckboxState();
  const { data: project } = useProjectQuery(projectName);

  return (
    <div className={css.selectOptionField}>
      <div>{`${checkboxValues.size} selected`}</div>
      <BsFillTrashFill
        onClick={() => {
          onDelete({
            contentIds: [...checkboxValues],
            token: project?.storageKey || "",
          });
        }}
        className={css.optionIcon}
      />
    </div>
  );
}

export function ContentsDeleteBoxSkeleton() {
  return <div className={css.selectOptionFieldSkeleton} />;
}
