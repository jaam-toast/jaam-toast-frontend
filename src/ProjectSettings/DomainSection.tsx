import { useState } from "react";
import isURL from "validator/lib/isURL";

import { TextField } from "../@shared";
import {
  useProjectQuery,
  useAddProjectOptionMutaion,
  useDeleteProjectOptionMutation,
} from "../@hooks";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import * as css from "./index.css";

import type { AddProjectOptions } from "../@types/api";

export function DomainSection({ projectName }: { projectName: string }) {
  const [domain, setDomain] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState("");
  const { data: project } = useProjectQuery(projectName);
  const updateDomain = useAddProjectOptionMutaion<"customDomain">();
  const deleteDomain = useDeleteProjectOptionMutation<"customDomain">();

  if (!project || !project.jaamToastDomain) {
    throw new NotFoundError(ERROR.NOT_FOUND.PARAMETER);
  }

  const handleDeleteClick = (domain: string) => {
    deleteDomain.mutate({
      projectName,
      option: { customDomain: domain },
    });
  };

  const handleAddClick = (data: Pick<AddProjectOptions, "customDomain">) => {
    if (!data) {
      return setWarningMessage("Domain data not found");
    }

    updateDomain.mutate({ projectName, option: data });
  };

  return (
    <section className={css.settingOptionSection}>
      <div className={css.sectionHead}>
        <span className={css.sectionTitle}>Domains</span>
      </div>
      <p className={css.sectionDescription}>
        You can register a domain using a
        <span className={css.sectionDescriptionHighlight}>CNAME</span> record.
        <br />
        The value of the custom CNAME record must point to
        <span className={css.sectionDescriptionHighlight}>
          {project.jaamToastDomain}
        </span>
        .
      </p>
      <p className={warningMessage ? css.warningMessage : css.baseMessage}>
        {warningMessage}
      </p>
      <div className={css.sectionOptionWrapper}>
        <TextField
          onTextFieldChange={text => {
            setDomain(text);
            if (!isURL(text)) {
              return setWarningMessage("The URL is not formatted correctly");
            }

            setWarningMessage("");
          }}
          placeholder="your-website.com"
          delay={500}
        />
        <button
          disabled={!domain}
          onClick={() => handleAddClick({ customDomain: domain })}
          className={css.addButton}
        >
          add
        </button>
      </div>
      <ul className={css.domainList}>
        {project.customDomain.map(domain => (
          <li key={domain} className={css.domainWrapper}>
            <span className={css.domain}>{domain}</span>
            <button
              onClick={() => handleDeleteClick(domain)}
              className={css.addButton}
            >
              delete
            </button>
          </li>
        ))}
        <li key={domain} className={css.domainWrapper}>
          <span className={css.domain}>{project.jaamToastDomain}</span>
        </li>
      </ul>
    </section>
  );
}
