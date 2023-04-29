import { TextField, useModal } from "../@shared";
import * as css from "./ModalContentsKey.css";
import { useProjectQuery } from "./useProjectQuery";

export function ModalContentsKey({ projectName }: { projectName: string }) {
  // TODO useContentsKeyQuery
  const { closeModal } = useModal();
  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    closeModal();

    return null;
  }

  const { cmsDomain, storageKey: contentsKey } = project;

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
            <div className={css.settingOptionSection}>
              <div className={css.sectionHead}>
                <span className={css.sectionTitle}>Content Access Token</span>
              </div>
              <TextField
                placeholder={contentsKey || "siY89Pm023u$&8RjQqj4%xD8DPl"}
                disabled
              />
            </div>
            <p className={css.fieldSubText}>
              The Permanent Auth Token must be passed via the Authorization
              header on HTTP requests in the format of a Bearer token:
            </p>
          </div>
        </div>
        <div className={css.settingOptionSection}>
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Content Api</span>
          </div>
          <TextField
            value={`${cmsDomain}/[your-schema-name]`}
            placeholder="https://api.jaamtoast.click/api/[yourSchemaName]"
            disabled
          />
        </div>
      </div>
    </section>
  );
}
