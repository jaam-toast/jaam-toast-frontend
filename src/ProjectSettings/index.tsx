import { DashboardHeader, EnvField, TextField } from "../@shared";
import * as css from "./index.css";

export function ProjectSettings() {
  const domainList = ["www.jaamtoast.click", "www.google.com"];

  return (
    <div className={css.layout}>
      <DashboardHeader />
      <>
        <section className={css.settingOptionSection}>
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Build Command</span>
            <button className={css.saveButton}>save</button>
          </div>
          <TextField placeholder="npm run build" />
        </section>

        <section className={css.settingOptionSection}>
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Install Command</span>
            <button className={css.saveButton}>save</button>
          </div>
          <TextField placeholder="npm install" />
        </section>

        <section className={css.settingOptionSection}>
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Environtment Variables</span>
            <button className={css.saveButton}>save</button>
          </div>
          <EnvField />
        </section>

        <section className={css.settingOptionSection}>
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Domains</span>
          </div>
          <div className={css.addDomainField}>
            <TextField />
            <button className={css.addButton}>add</button>
          </div>
          <ul className={css.domainList}>
            {domainList.map(domain => (
              <li key={domain} className={css.domain}>
                {domain}
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`${css.settingOptionSection} ${css.deleteProjectSection}`}
        >
          <div className={css.sectionHead}>
            <span className={css.sectionTitle}>Delete Project</span>
          </div>
          <p className={css.sectionDescription}>
            Once you delete a project, there is no going back. Please be
            certain.
          </p>
          <button className={css.deleteProjectButton}>
            delete project permanently
          </button>
        </section>
      </>
    </div>
  );
}
