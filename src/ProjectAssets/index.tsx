import { useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateAssetContentMutation, useProjectQuery } from "../@hooks";
import { ValidationError } from "../@utils/createError";
import { AssetsList, AssetsListSkeleton } from "./AssetsList";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import * as css from "./index.css";

const MB = 1024 * 1024;

export function ProjectAssets() {
  const { projectName } = useParams();
  const assetInput = useRef<HTMLInputElement>(null);
  const uploadAssets = useCreateAssetContentMutation();

  if (!projectName) {
    throw new ValidationError("project not found");
  }

  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new ValidationError("project data not found");
  }

  // asset 진행 중
  const handleFilesUpLoad = () => {
    if (!assetInput.current || !assetInput.current.files) {
      return toast.error("File not found.");
    }

    const assetsData = Array.from(assetInput.current.files).reduce(
      (data, file: File) => {
        data.formData.append("assets", file);
        data.size += file.size;

        return data;
      },
      { size: 0, formData: new FormData() },
    );

    if (assetsData.size > MB * 100) {
      return toast.error("File uploads are limited to 100MB or less.");
    }

    uploadAssets.mutate({
      token: project?.storageKey,
      assets: assetsData.formData,
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
          id="assetInput"
          multiple
          type="file"
          ref={assetInput}
          onChange={handleFilesUpLoad}
        />
        <label htmlFor="assetInput" className={css.newButton}>
          + New Asset
        </label>
      </header>
      <AsyncBoundary suspenseFallback={<AssetsListSkeleton />}>
        <AssetsList projectName={projectName} token={project?.storageKey} />
      </AsyncBoundary>
    </section>
  );
}
