import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import * as _ from "lodash";

import {
  Icon,
  Modal,
  useModal,
  DashboardHeader,
  TextField,
  SelectBox,
} from "../@shared";
import { ModalNewSchema } from "./ModalNewSchema";
import { ModalSchemaProperties } from "./ModalSchemaProperties";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";
import { useDeleteSchemaMutation } from "./useSchemaMutation";
import {
  useCheckboxState,
  useSetCheckboxState,
} from "../@shared/useCheckboxStore";
import * as css from "./index.css";

import { SchemaList } from "../@types/api";

type SortMode = "Default" | "Ascending" | "Descending";

type SortedSchema = SchemaList[] | null;

export function ProjectSchema() {
  const params = useParams();
  const { projectName } = params;
  const [searchword, setSearchword] = useState<string>("");
  const [sortedSchema, setSortedSchema] = useState<SortedSchema>();
  const { values: checkboxValues, isAllChecked } = useCheckboxState();
  const { toggleAllChecked, setValue: setCheckboxValue } =
    useSetCheckboxState();
  const { openModal } = useModal();

  if (!projectName) {
    return <Navigate to="/" />;
  }

  const { data: project, refetch } = useProjectQuery(projectName!);
  const queryClient = useQueryClient();
  const deleteSchema = useDeleteSchemaMutation({
    onSuccess: () => {
      alert("Success schema delete");
      queryClient.invalidateQueries({ queryKey: ["schema-delete"] });
      refetch();
    },
    onError: () => {
      alert("Failed to delete schema. Please try again.");
    },
  });

  // TODO sort menu 분리 필요
  const handleChangeSortMode = (mode: SortMode) => {
    switch (mode) {
      case "Default": {
        setSortedSchema(null);

        return;
      }
      case "Ascending": {
        setSortedSchema(_.sortBy([...project?.schemaList!], "schemaName"));

        return;
      }
      case "Descending": {
        setSortedSchema(
          _.sortBy([...project?.schemaList!], "schemaName").reverse(),
        );

        return;
      }
    }
  };

  const handleAddClick = () => {
    openModal({
      component: (
        <ModalNewSchema
          projectName={projectName}
          schemaList={project?.schemaList}
        />
      ),
      location: "right",
      animation: "slideToLeft",
    });
  };

  const handleSchemaClick = ({ index }: { index: number }) => {
    openModal({
      component: (
        <ModalSchemaProperties
          currentSchema={project?.schemaList[index].schema!}
          projectName={projectName}
        />
      ),
    });
  };

  const handleDelete = ({ schemaNames }: { schemaNames: string[] }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteSchema.mutate({ projectName, schemaNames });
    }
  };

  return (
    <div className={css.layout}>
      <DashboardHeader />
      <div className={css.container}>
        <Modal />
        <header className={css.header}>
          <button onClick={handleAddClick} className={css.newButton}>
            + New Schema
          </button>
        </header>
        <div className={css.fieldNameWrapper}>
          <TextField onTextFieldChange={setSearchword} placeholder="Search.." />
          <div className={css.typeButton}>
            <SelectBox
              options={["Default", "Ascending", "Descending"]}
              defaultSelect={"Default"}
              onSelectionChange={handleChangeSortMode}
            />
          </div>
        </div>
        {!!checkboxValues.size && (
          <div className={css.selectOptionField}>
            <div>{`${
              isAllChecked ? project?.schemaList.length : checkboxValues.size
            } selected`}</div>
            <BsFillTrashFill
              onClick={() => handleDelete({ schemaNames: [...checkboxValues] })}
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
                  onChange={() =>
                    toggleAllChecked(
                      (sortedSchema || project!.schemaList).map(
                        data => data.schema.title,
                      ),
                    )
                  }
                />
              </th>
              <th className={css.th}>Name</th>
              <th className={css.th}>Field</th>
              <th className={`${css.th}`}>
                <div className={css.optionField}>Option</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {project &&
              (sortedSchema || project?.schemaList)
                .filter((data: SchemaList) =>
                  searchword ? data.schema.title.includes(searchword) : true,
                )
                .map((data: SchemaList, index: number) => (
                  <tr className={css.row} key={data.schema.title}>
                    <td className={css.cell}>
                      <div className={css.checkboxField}>
                        <input
                          type="checkbox"
                          value={data.schema.title}
                          checked={
                            isAllChecked ||
                            checkboxValues.has(data.schema.title)
                          }
                          onChange={e => setCheckboxValue(e.target.value)}
                        />
                      </div>
                    </td>
                    <td className={css.cell}>
                      <div
                        onClick={() => handleSchemaClick({ index })}
                        className={css.nameField}
                      >
                        <Icon>
                          <span>{data.schema.title[0].toUpperCase()}</span>
                        </Icon>
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
                          onClick={() => handleSchemaClick({ index })}
                          className={css.optionIcon}
                        />
                        <BsFillTrashFill
                          onClick={() =>
                            handleDelete({ schemaNames: [data.schema.title] })
                          }
                          className={css.optionIcon}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
