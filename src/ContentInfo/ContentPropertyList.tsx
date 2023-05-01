import { useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { JsonSchema, jsonSchemaToJaamSchema } from "@jaam-schema/src";

import { FieldTitle } from "../ProjectSchema/FieldTitle";
import { ContentPropertyEditor } from "../ProjectContents/ContentPropertyEditor";
import {
  useContentsState,
  useSetContentsState,
} from "../ProjectContents/useContentsStore";
import { useContentQuery } from "../ProjectContents/useContentQuery";
import * as css from "./ContentPropertyList.css";

export function ContentPropertyList({
  contentId,
  schema,
  token,
}: {
  contentId: string;
  schema: JsonSchema;
  token: string;
}) {
  const { contentsErrorMessage } = useContentsState();
  const { setContent } = useSetContentsState();

  const { data: content } = useContentQuery({
    schemaName: schema.title,
    token,
    contentId,
  });

  useEffect(() => {
    if (!content) {
      return;
    }

    setContent(content);
  }, []);

  const jaamSchemaPropertyList = useMemo(() => {
    return Object.entries(jsonSchemaToJaamSchema(schema).properties);
  }, [contentId, schema]);

  if (!content) {
    return <Navigate to="/error" />;
  }

  return (
    <section className={css.schemaNameSection}>
      {jaamSchemaPropertyList.map(([property, data]) => (
        <div key={property}>
          <div className={css.fieldHeader}>
            <FieldTitle>{property}</FieldTitle>
            <div className={css.fieldTypeWrapper}>
              <div className={css.fieldType}>{data.type}</div>
              {schema.required && schema.required.includes(property) && (
                <div className={css.fieldType}>required</div>
              )}
            </div>
          </div>
          <div>{contentsErrorMessage[property]}</div>
          <ContentPropertyEditor
            type={data.type}
            property={property}
            value={content[property]}
          />
        </div>
      ))}
    </section>
  );
}
