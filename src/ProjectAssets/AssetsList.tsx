import { useEffect, useState } from "react";

import { useModal } from "../@hooks";
import { AssetAPIClient } from "../@utils/assetsAPI";
import { ModalAssetInfo } from "./ModalAssetInfo";
import * as css from "./AssetsList.css";

import type { AssetInfoForEditing } from "../@types/cms";

export function AssetsList({
  projectName,
  token,
}: {
  projectName: string;
  token: string;
}) {
  const [assetsInfoList, setAssetsInfoList] = useState<AssetInfoForEditing[]>(
    [],
  );
  const [onMouseImgIndex, setOnMouseImgIndex] = useState<number | null>(null);
  const { openModal } = useModal();

  // TODO db query로 변경
  useEffect(() => {
    const assetAPI = new AssetAPIClient();
    assetAPI.connect();

    (async () => {
      const assetList = await assetAPI.getAssetInfoList(projectName);

      setAssetsInfoList(assetList);
    })();
  }, []);

  const handleAseetClick = (asset: AssetInfoForEditing) => {
    openModal({ component: <ModalAssetInfo asset={asset} token={token} /> });
  };

  return (
    <section className={css.container}>
      {assetsInfoList.map((asset, index) => (
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
                <span className={css.assetPreviewName}>
                  {asset.name} <br />
                </span>
                <span>{asset.size && Math.round(asset.size / 1024)}kb</span>
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
      {[...new Array(10)].map(() => (
        <div className={css.assetPreviewWrapperSkeleton} />
      ))}
    </div>
  );
}
