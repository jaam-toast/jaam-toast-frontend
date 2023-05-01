import { useState } from "react";
import { useModal, useProjectQuery } from "../@shared";
import * as css from "./ModalContentsKey.css";

export function ModalContentsKey({ projectName }: { projectName: string }) {
  // TODO useContentsKeyQuery
  const { closeModal } = useModal();
  const { data: project } = useProjectQuery(projectName);
  const [isApiCopied, setIsApiCopied] = useState<boolean>(false);
  const [isTokenCopied, setIsTokenCopied] = useState<boolean>(false);

  if (!project) {
    closeModal();

    return null;
  }

  const { cmsDomain, storageKey: contentsKey } = project;

  const handleApiCopy = (api: string) => {
    setIsApiCopied(true);

    navigator.clipboard.writeText(api);

    setTimeout(() => {
      setIsApiCopied(false);
    }, 700);
  };

  const handleTokenCopy = (token: string) => {
    setIsTokenCopied(true);

    navigator.clipboard.writeText(token);

    setTimeout(() => {
      setIsTokenCopied(false);
    }, 700);
  };

  return (
    <section className={css.container}>
      <header className={css.header}>
        <div className={css.headerFirstLine}>
          <h2>Contents Access</h2>
        </div>
        <p className={css.fieldSubText}>
          The token and API address to access the content.
        </p>
      </header>
      <div className={css.fieldWrapper}>
        <div>
          <div>
            <div
              className={`${css.settingOptionSection} ${
                isTokenCopied ? css.copied : ""
              }`}
            >
              <div className={css.sectionHead}>
                <span className={css.sectionTitle}>Content Access Token</span>
                {isTokenCopied && (
                  <span className={css.sectionSubtitle}>copied!</span>
                )}
              </div>
              <div
                className={css.contentsKey}
                onClick={() => handleTokenCopy(contentsKey)}
              >
                {contentsKey}
              </div>
            </div>
            <p className={css.fieldSubText}>
              The Permanent Auth Token must be passed via the Authorization
              header on HTTP requests in the format of a Bearer token:
            </p>
          </div>
        </div>
        <div
          className={`${css.settingOptionSection} ${
            isApiCopied ? css.copied : ""
          }`}
        >
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Content Api</span>
            {isApiCopied && (
              <span className={css.sectionSubtitle}>copied!</span>
            )}
          </div>
          <div
            className={css.contentsKey}
            onClick={() =>
              handleApiCopy("https://api.jaamtoast.click/api/[yourSchemaName]")
            }
          >
            {"https://api.jaamtoast.click/api/[yourSchemaName]"}
          </div>
        </div>
      </div>
    </section>
  );
}
