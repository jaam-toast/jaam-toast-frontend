import { Suspense } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { jsonSchemaValidator } from "@jaam-schema/src";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import {
  ContentPropertyList,
  ContentPropertyListSkeleton,
} from "./ContentPropertyList";
import {
  useUpdateContentMutation,
  useContentsState,
  useSetContentsState,
} from "../@hooks";
import * as css from "./index.css";

export function ContentInfo() {
  const navigate = useNavigate();
  const { projectName, schemaName, contentId } = useParams();
  const { content: contentState, schema, token } = useContentsState();
  const { reset } = useSetContentsState();

  if (!projectName || !contentId || !schemaName) {
    return <Navigate to="/error" />;
  }

  // TODO async로 변경
  const updateContent = useUpdateContentMutation({
    onSuccess: () => {
      alert("Success content update");
      reset();
      navigate(-1);
    },
    onError: () => {
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
          {!!schema.title && (
            <div className={css.timeWrapper}>
              <div>
                <p>Created At</p>
                <div>
                  {dayjs
                    .utc(contentState._createdAt)
                    .local()
                    .format("YYYY/MM/DD HH:mm a")}
                </div>
              </div>
              <div>
                <p>Updated At</p>
                <div>
                  {dayjs
                    .utc(contentState._updatedAt)
                    .local()
                    .format("YYYY/MM/DD HH:mm a")}
                </div>
              </div>
            </div>
          )}
        </header>
        <Suspense fallback={<ContentPropertyListSkeleton />}>
          <ContentPropertyList
            schemaName={schemaName}
            projectName={projectName}
            contentId={contentId}
          />
        </Suspense>
      </section>
    </div>
  );
}
