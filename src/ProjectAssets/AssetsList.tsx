import { useState } from "react";

import { useContentsListQuery, useModal } from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import { ModalAssetInfo } from "./ModalAssetInfo";
import * as css from "./AssetsList.css";

import type { Asset } from "../@types/cms";

export function AssetsList({
  projectName,
  token,
}: {
  projectName: string;
  token: string;
}) {
  const [onMouseImgIndex, setOnMouseImgIndex] = useState<number | null>(null);
  const { openModal } = useModal();
  const { data: assets } = useContentsListQuery({
    schemaName: "assets",
    token,
  });

  if (!assets) {
    throw new NotFoundError(ERROR.NOT_FOUND.ALL);
  }

  const assetsList = assets.contents as Asset[];

  const handleAseetClick = (asset: Asset) => {
    openModal({
      component: (
        <ModalAssetInfo asset={{ ...asset, name: asset.name }} token={token} />
      ),
    });
  };

  return (
    <section className={css.container}>
      {assetsList.map((asset, index) => (
        <div
          key={asset.url}
          className={css.assetPreviewWrapper}
          onMouseEnter={() => setOnMouseImgIndex(index)}
          onMouseLeave={() => setOnMouseImgIndex(null)}
          onClick={() => handleAseetClick(asset)}
        >
          {index === onMouseImgIndex && (
            <>
              <div className={css.assetPreviewInfo}>
                <span className={css.assetPreviewName}>{asset.name}</span>
                <span>{Math.round(asset.size / 1024)}kb</span>
              </div>
              <div className={css.assetPreviewBg} />
            </>
          )}
          <div className={css.assetPreviewImgWrapper}>
            <img className={css.assetPreviewImg} src={asset.url} alt="k" />
          </div>
        </div>
      ))}
    </section>
  );
}

export function AssetsListSkeleton() {
  return (
    <div className={css.container}>
      {[...new Array(12)].map((_, index) => (
        <div key={index} className={css.assetPreviewWrapperSkeleton} />
      ))}
    </div>
  );
}
