import { useState } from "react";
import isURL from "validator/lib/isURL";

import { TextField } from "../@shared";
import {
  useProjectQuery,
  useUpdateProjectMutaion,
  useDeleteProjectOptionMutation,
} from "../@hooks";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import * as css from "./index.css";

import type { UpdateProjectOption } from "../@types/api";

export function DomainSection({ projectName }: { projectName: string }) {
  const [domain, setDomain] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState("");
  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new NotFoundError(ERROR.NOT_FOUND.PARAMETER);
  }

  const { buildDomain, originalBuildDomain } = project;
  const updateDomain = useUpdateProjectMutaion<"buildDomain">();
  const deleteDomain = useDeleteProjectOptionMutation<"buildDomain">();

  const handleDeleteClick = (domain: string) => {
    deleteDomain.mutate({
      projectName,
      option: { buildDomain: domain },
    });
  };

  const handleAddClick = (data: UpdateProjectOption<"buildDomain">) => {
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
          {originalBuildDomain}
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
          onClick={() => handleAddClick({ buildDomain: domain })}
          className={css.addButton}
        >
          add
        </button>
      </div>
      <ul className={css.domainList}>
        {project.buildDomain.map(domain => (
          <li key={domain} className={css.domainWrapper}>
            <div className={css.domain}>{domain}</div>
            {buildDomain.length > 1 && (
              <button
                onClick={() => handleDeleteClick(domain)}
                className={css.addButton}
              >
                delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
