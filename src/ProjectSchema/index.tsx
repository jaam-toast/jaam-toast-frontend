import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import {
  ColorBox,
  Modal,
  useModal,
  DashboardHeader,
  TextField,
  SelectBox,
} from "../@shared";
import { ModalNewSchema } from "./ModalNewSchema";
import { ModalSchemaProperties } from "./ModalSchemaProperties";
import { useProjectSchemaQuery } from "./useSchemaQuery";
import { useDeleteSchemaMutation } from "./useSchemaMutation";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";
import {
  useCheckboxState,
  useSetCheckboxState,
} from "../@shared/useCheckboxStore";
import { sortByMode as sortBy } from "../@utils/sortByMode";
import * as css from "./index.css";
import { OrderMode } from "src/@types/cms";

import type { SchemaList } from "../@types/api";

export function ProjectSchema() {
  const params = useParams();
  const { projectName } = params;
  const [searchword, setSearchword] = useState<string>("");
  const [orderMode, setOrderMode] = useState<OrderMode>("ascending");
  const { values: checkboxValues, isAllChecked } = useCheckboxState();
  const { toggleAllChecked, setValue: setCheckboxValue } =
    useSetCheckboxState();
  const { openModal } = useModal();

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const { data: schemaList, refetch } = useProjectSchemaQuery(projectName);

  if (!schemaList) {
    return <Navigate to="/error" />;
  }

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

  const handleAddClick = () => {
    openModal({
      component: (
        <ModalNewSchema projectName={projectName} schemaList={schemaList} />
      ),
      location: "right",
      animation: "slideToLeft",
    });
  };

  const handleSchemaClick = ({ index }: { index: number }) => {
    openModal({
      component: (
        <ModalSchemaProperties
          currentSchema={schemaList[index].schema!}
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
              options={["ascending", "descending"]}
              defaultSelect={"ascending"}
              onSelectionChange={setOrderMode}
            />
          </div>
        </div>
        {!!checkboxValues.size && (
          <div className={css.selectOptionField}>
            <div>{`${
              isAllChecked ? schemaList.length : checkboxValues.size
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
                    toggleAllChecked(schemaList.map(data => data.schema.title))
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
            {sortBy<SchemaList>({
              mode: orderMode,
              data: schemaList!,
              fieldName: "schemaName",
            })
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
                          isAllChecked || checkboxValues.has(data.schema.title)
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
                      <ColorBox>
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
