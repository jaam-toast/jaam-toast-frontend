import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import { Icon, Modal, useModal, DashboardHeader, TextField } from "../@shared";
import { ModalNewSchema } from "./ModalNewSchema";
import { ModalSchemaProperties } from "./ModalSchemaProperties";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";
import { useDeleteSchemaMutation } from "./useSchemaMutation";
import * as css from "./index.css";

import { SchemaList } from "../@types/api";

export function ProjectSchema() {
  const params = useParams();
  const { projectName } = params;
  const [searchword, setSearchword] = useState<string>("");
  const { onModal: showModal } = useModal();

  if (!projectName) {
    return <Navigate to="/" />;
  }

  const { data: project } = useProjectQuery(projectName);

  const deleteSchema = useDeleteSchemaMutation({
    onSuccess: () => {
      alert("Success schema delete");
    },
    onError: () => {
      alert("Failed to delete schema. Please try again.");
    },
  });

  const handleAddClick = () => {
    showModal({
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
    showModal({
      component: (
        <ModalSchemaProperties
          currentSchema={project?.schemaList[index].schema!}
          projectName={projectName}
        />
      ),
    });
  };

  const handleDelete = ({ schemaName }: { schemaName: string }) => {
    if (window.confirm("Do you want to delete the field?")) {
      deleteSchema.mutate({ projectName, schemaName });
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
        <div className={css.searchInput}>
          <TextField onTextFieldChange={setSearchword} placeholder="Search.." />
        </div>
        <table className={css.table}>
          <thead>
            <tr>
              <th className={css.thCheckbox}>
                <input type="checkbox" />
              </th>
              <th className={css.th}>Name</th>
              <th className={css.th}>Field</th>
              <th className={css.th}>Option</th>
            </tr>
          </thead>
          <tbody>
            {project?.schemaList
              .filter((data: SchemaList) =>
                searchword ? data.schema.title.includes(searchword) : true,
              )
              .map((data: SchemaList, index: number) => (
                <tr className={css.row} key={data.schema.title}>
                  <td className={css.cell}>
                    <div className={css.checkboxField}>
                      <input type="checkbox" />
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
                          handleDelete({ schemaName: data.schema_name })
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
