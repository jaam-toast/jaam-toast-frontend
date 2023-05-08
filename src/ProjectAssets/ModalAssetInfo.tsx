import { BsFillTrashFill } from "react-icons/bs";
import { useDeleteAssetsMutation } from "../@hooks";
import * as css from "./ModalAssetInfo.css";

import type { AssetInfoForEditing } from "../@types/cms";

export function ModalAssetInfo({
  asset,
  token,
}: {
  asset: AssetInfoForEditing;
  token: string;
}) {
  // TODO useContentsKeyQuery
  const deleteAsset = useDeleteAssetsMutation();

  const handleDeleteClick = async () => {
    if (!asset.name) {
      // TODO toast
      return;
    }

    //TODO error handle
    try {
      await deleteAsset.mutateAsync({ token, asset: asset.name });
    } catch (error) {}
  };

  return (
    <section className={css.container}>
      <div className={css.header}>
        <div className={css.assetInfo}>
          <span>name: {asset.name}</span>
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
        <img className={css.assetImg} src={asset.url} alt={asset.name} />
      </div>
    </section>
  );
}
