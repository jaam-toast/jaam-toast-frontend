import { BsFillTrashFill } from "react-icons/bs";
import { useDeleteAssetContentMutation } from "../@hooks";
import * as css from "./ModalAssetInfo.css";

import type { Asset } from "../@types/cms";

export function ModalAssetInfo({
  asset,
  token,
}: {
  asset: Asset & { name?: string };
  token: string;
}) {
  const deleteAsset = useDeleteAssetContentMutation();

  const handleDeleteClick = () => {
    // deleteAsset.mutate({
    //   token,
    //   path: asset.path ?? "",
    //   assetId: asset._id ?? "",
    // });
  };

  return (
    <section className={css.container}>
      <div className={css.header}>
        <div className={css.assetInfo}>
          <span className={css.assetName}>name: {asset.name}</span>
          <span>size: {asset.size && Math.round(asset.size / 1024)}KB</span>
        </div>
        <BsFillTrashFill
          onClick={handleDeleteClick}
          className={css.assetInfoDeleteIcon}
          size={25}
        />
        <div className={css.assetInfoBg} />
      </div>
      <div className={css.assetImgWrapper}>
        <img className={css.assetImg} src={asset.url} alt={asset.path} />
      </div>
    </section>
  );
}
