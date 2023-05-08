import { useModal } from "../@hooks";
import { ModalDeleteChecker } from "./ModalDeleteChecker";
import * as css from "./index.css";

export function ProjectDeleteSection({ projectName }: { projectName: string }) {
  const { openModal } = useModal();

  const handleDeleteProject = async () => {
    openModal({
      component: <ModalDeleteChecker projectName={projectName} />,
    });
  };

  return (
    <section
      className={`${css.settingOptionSection} ${css.deleteProjectSection}`}
    >
      <div className={css.sectionHead}>
        <span className={css.sectionTitle}>Delete Project</span>
      </div>
      <p className={css.sectionDescription}>
        Once you delete a project, there is no going back. Please be certain.
      </p>
      <button onClick={handleDeleteProject} className={css.deleteButton}>
        delete project permanently
      </button>
    </section>
  );
}
