import { useRef } from "react";
import { useParams } from "react-router-dom";

import { useCreateAssetsMutation, useProjectQuery } from "../@hooks";
import { ValidationError } from "../@utils/createError";
import { AssetsList } from "./AssetsList";
import * as css from "./index.css";

const MB = 1048576;

export function ProjectAssets() {
  const { projectName } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const createAssets = useCreateAssetsMutation();

  if (!projectName) {
    throw new ValidationError("project not found");
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new ValidationError("project data not found");
  }

  const handleFileLoad = async () => {
    if (!ref.current || !ref.current.files) {
      // TODO toast
      return alert("File not found.");
    }

    const { name, size } = ref.current.files[0];

    // TODO toast
    if (size > MB * 100) {
      return alert("File uploads are limited to 100MB or less.");
    }

    // TODO error handle
    try {
      await createAssets.mutateAsync({
        token: project?.storageKey,
        storagePath: `${projectName}/${name}`,
        asset: ref.current.files[0],
      });
    } catch (error) {}
  };

  return (
    <section>
      <header className={css.header}>
        <div>
          <span className={css.headerDescription}>
            File uploads are limited to 100MB or less.
          </span>
        </div>
        <input
          hidden
          id="new-asset"
          ref={ref}
          type="file"
          onChange={handleFileLoad}
        />
        <label htmlFor="new-asset" className={css.newButton}>
          + New Asset
        </label>
      </header>
      <AssetsList projectName={projectName} token={project?.storageKey} />
    </section>
  );
}
