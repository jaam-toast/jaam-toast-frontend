import { useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { jsonSchemaToJaamSchema } from "@jaam-schema/src";

import {
  useContentsState,
  useSetContentsState,
  useContentQuery,
  useProjectQuery,
} from "../@hooks";
import { FieldTitle } from "../ProjectSchema/FieldTitle";
import { ContentPropertyEditor } from "../ProjectContents/ContentPropertyEditor";
import * as css from "./ContentPropertyList.css";

type ContentPropertyListProps = {
  contentId: string;
  schemaName: string;
  projectName: string;
};

export function ContentPropertyList({
  contentId,
  schemaName,
  projectName,
}: ContentPropertyListProps) {
  const { contentsErrorMessage } = useContentsState();
  const { setContent, setSchema, setToken } = useSetContentsState();

  const { data: project } = useProjectQuery(projectName);
  const schema = useMemo(
    () =>
      project?.schemaList.filter(data => data.schemaName === schemaName)[0]
        .schema,
    [],
  );

  // TODO error handeling
  if (!schema || !project) {
    return null;
  }

  // TODO error handeling
  const { data: content } = useContentQuery({
    schemaName: schemaName,
    token: project?.storageKey,
    contentId,
  });

  if (!content) {
    return <Navigate to="/error" />;
  }

  useEffect(() => {
    if (!content) {
      return;
    }

    setContent(content);
    setSchema(schema);
    setToken(project.storageKey);
  }, []);

  const jaamSchemaPropertyList = useMemo(() => {
    return Object.entries(jsonSchemaToJaamSchema(schema).properties);
  }, [contentId, schema]);

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

export function ContentPropertyListSkeleton() {
  return <div className={css.schemaNameSectionSkeleton}></div>;
}
