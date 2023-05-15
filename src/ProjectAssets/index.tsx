import { useRef } from "react";
import { useParams } from "react-router-dom";

import { useCreateAssetContentMutation, useProjectQuery } from "../@hooks";
import { ValidationError } from "../@utils/createError";
import { AssetsList, AssetsListSkeleton } from "./AssetsList";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import * as css from "./index.css";
import { toast } from "react-toastify";

const MB = 1024 * 1024;

export function ProjectAssets() {
  const { projectName } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const createAssets = useCreateAssetContentMutation();

  if (!projectName) {
    throw new ValidationError("project not found");
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new ValidationError("project data not found");
  }

  const handleFileUpLoad = () => {
    if (!ref.current || !ref.current.files) {
      return toast.error("File not found.");
    }

    const { name, size } = ref.current.files[0];

    if (size > MB * 100) {
      return toast.error("File uploads are limited to 100MB or less.");
    }

    createAssets.mutate({
      token: project?.storageKey,
      name,
      projectName,
      asset: ref.current.files[0],
    });
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
          onChange={handleFileUpLoad}
        />
        <label htmlFor="new-asset" className={css.newButton}>
          + New Asset
        </label>
      </header>
      <AsyncBoundary suspenseFallback={<AssetsListSkeleton />}>
        <AssetsList projectName={projectName} token={project?.storageKey} />
      </AsyncBoundary>
    </section>
  );
}
