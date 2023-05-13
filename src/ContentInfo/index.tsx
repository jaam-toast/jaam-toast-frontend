import { useNavigate, useParams } from "react-router-dom";
import { jsonSchemaValidator } from "@jaam-schema/src";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { toast } from "react-toastify";

import {
  ContentPropertyList,
  ContentPropertyListSkeleton,
} from "./ContentPropertyList";
import { useUpdateContentMutation, useContentsState } from "../@hooks";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { NotFoundError } from "../@utils/createError";
import * as css from "./index.css";

export function ContentInfo() {
  const navigate = useNavigate();
  const { projectName, schemaName, contentId } = useParams();
  const { content: contentState, schema, token } = useContentsState();
  const updateContent = useUpdateContentMutation();

  if (!projectName || !contentId || !schemaName) {
    throw new NotFoundError("projectName, contentId not found");
  }

  const handlePrevBtnClick = () => {
    navigate(-1);
  };

  const handleSaveBtnClick = () => {
    const { result, message } = jsonSchemaValidator({
      schema,
      content: contentState,
    });

    if (!result) {
      return toast.error(message);
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
        <AsyncBoundary suspenseFallback={<ContentPropertyListSkeleton />}>
          <ContentPropertyList
            schemaName={schemaName}
            projectName={projectName}
            contentId={contentId}
          />
        </AsyncBoundary>
      </section>
    </div>
  );
}
