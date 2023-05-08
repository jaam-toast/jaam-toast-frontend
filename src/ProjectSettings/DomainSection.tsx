import { useState } from "react";

import { TextField } from "../@shared";
import {
  useProjectQuery,
  usePutProjectMutaion,
  usePatchProjectMutaion,
} from "../@hooks";
import { ValidationError } from "../@utils/createError";
import * as css from "./index.css";

import type { PatchProjectOption } from "../@types/api";

export function DomainSection({ projectName }: { projectName: string }) {
  const [domain, setDomain] = useState<string>("");
  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new ValidationError("project not found");
  }
  const { buildDomain, originalBuildDomain } = project;
  const updateDomain = usePatchProjectMutaion();
  const deleteDomain = usePutProjectMutaion();

  // TODO error handle
  const handleDeleteClick = async (domain: string) => {
    const filteredDomainArr = buildDomain.filter(
      originalDomain => originalDomain !== domain,
    );

    try {
      await deleteDomain.mutateAsync({
        projectName,
        option: { buildDomain: filteredDomainArr },
      });
    } catch (error) {}
  };

  const handleAddClick = (data: Pick<PatchProjectOption, "buildDomain">) => {
    if (!data) {
      // TODO toast
      alert("Domain data not found");
    }

    // TODO error handle
    try {
      updateDomain.mutateAsync({ projectName, option: data });
    } catch (error) {}
  };

  return (
    <section className={css.settingOptionSection}>
      <div className={css.sectionHead}>
        <span className={css.sectionTitle}>Domains</span>
      </div>
      <p className={css.sectionDescription}>
        You can register a domain using a{" "}
        <span className={css.sectionDescriptionHighlight}>CNAME</span> record.{" "}
        <br />
        The value of the custom CNAME record must point to{" "}
        <span className={css.sectionDescriptionHighlight}>
          {originalBuildDomain}
        </span>
        .
      </p>
      <div className={css.sectionOptionWrapper}>
        <TextField
          onTextFieldChange={setDomain}
          placeholder="your-website.com"
          delay={500}
        />
        <button
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
