import { Suspense, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import {
  Modal,
  useModal,
  DashboardHeader,
  TextField,
  SelectBox,
} from "../@shared";
import { ModalNewContent } from "./ModalNewContent";
import { ModalSchemaProperties } from "../ProjectSchema/ModalSchemaProperties";
import { ProjectContentsList } from "./ProjectContentsList";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const params = useParams();
  const { projectName } = params;

  const [searchword, setSearchword] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const [currentSchema, setCurrentSchema] = useState<string>("");
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState<number>(0);
  const { openModal } = useModal();

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const { data: project, refetch } = useProjectQuery(projectName);

  if (!project) {
    return <Navigate to="/error" />;
  }

  const { schemaList, storageKey: token } = project;
  const { schema } = useMemo(
    () => schemaList[currentSchemaIndex],
    [currentSchemaIndex],
  );

  const handleAddClick = () => {
    openModal({
      component: <ModalNewContent schemaList={schemaList} token={token} />,
    });
  };

  return (
    <div className={css.layout}>
      <DashboardHeader />
      <div className={css.container}>
        <Modal />
        <header className={css.header}>
          <button onClick={handleAddClick} className={css.newButton}>
            + New Contents
          </button>
        </header>
        <div className={css.searchInputWrapper}>
          {/* <TextField onTextFieldChange={setSearchword} placeholder="Search.." /> */}
          <div className={css.filterInputBox}>
            <SelectBox
              options={schemaList.map(data => data.schemaName) || []}
              defaultSelect={schema.title}
              onSelectionChange={(schema, index) => {
                setCurrentSchema(schema);
                setCurrentSchemaIndex(index);
              }}
              label={"Schema"}
            />
          </div>
          <div className={css.filterInputBox}>
            <SelectBox
              options={["ascending", "descending"]}
              defaultSelect={"ascending"}
              onSelectionChange={setOrderOption}
              label={"Order"}
            />
          </div>
          <div className={css.sortInputBox}>
            <SelectBox
              options={["createdAt", "updatedAt"]}
              defaultSelect={"createdAt"}
              onSelectionChange={setSortOption}
              label={"Sort"}
            />
          </div>
        </div>
      </div>
      <ProjectContentsList
        schema={schema}
        token={token}
        orderOption={orderOption}
        sortOption={sortOption}
        searchword={searchword}
      />
    </div>
  );
}
