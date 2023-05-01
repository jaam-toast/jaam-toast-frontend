import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { jsonSchemaValidator } from "@jaam-schema/src";

import { ContentPropertyList } from "./ContentPropertyList";
import { TimeInfo } from "./TimeInfo";
import {
  useProjectQuery,
  useUpdateContentMutation,
  useContentsState,
  useSetContentsState,
} from "../@hooks";
import * as css from "./index.css";

export function ContentInfo() {
  const navigate = useNavigate();
  const params = useParams();
  const { projectName, schemaName, contentId } = params;
  const { content: contentState } = useContentsState();
  const { reset } = useSetContentsState();

  if (!projectName || !contentId || !schemaName) {
    return <Navigate to="/error" />;
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    return <Navigate to="/error" />;
  }

  const { schemaList, storageKey: token } = project;
  const schema = useMemo(
    () => schemaList.filter(data => data.schemaName === schemaName)[0].schema,
    [],
  );

  const updateContent = useUpdateContentMutation({
    onSuccess: () => {
      alert("Success content update");
      reset();
      navigate(-1);
    },
    onError: e => {
      alert("Failed to update content. Please try again.");
    },
  });

  const handlePrevBtnClick = () => {
    navigate(-1);
  };

  const handleSaveBtnClick = () => {
    const { result, message } = jsonSchemaValidator({
      schema,
      content: contentState,
    });

    if (!result) {
      return alert(message);
    }

    updateContent.mutate({ token, schemaName, contentId });
  };

  return (
    <div className={css.container}>
      <div className={css.buttonWrapper}>
        <button
          onClick={handlePrevBtnClick}
          className={`${css.button} ${css.prevButton}`}
        >
          + Prev
        </button>
        <button
          onClick={handleSaveBtnClick}
          className={`${css.button} ${css.saveButton}`}
        >
          + Save
        </button>
      </div>
      <section className={css.wrapper}>
        <header className={css.header}>
          <div className={css.titleWrapper}>
            <h3>Content Info</h3>
          </div>
          <div className={css.timeWrapper}>
            <TimeInfo schema={schema} token={token} contentId={contentId} />
          </div>
        </header>
        <ContentPropertyList
          schema={schema}
          token={token}
          contentId={contentId}
        />
      </section>
    </div>
  );
}
