import { BsFillTrashFill } from "react-icons/bs";
import {
  useDeleteAssetContentMutation,
  useModal,
  useSetConfirmModal,
} from "../@hooks";
import * as css from "./ModalAssetInfo.css";

import type { Asset } from "../@types/cms";
import { useState } from "react";

export function ModalAssetInfo({
  asset,
  token,
}: {
  asset: Asset & { name?: string };
  token: string;
}) {
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);
  const { closeModal } = useModal();
  const { openConfirm } = useSetConfirmModal();
  const deleteAsset = useDeleteAssetContentMutation();

  const handleDeleteClick = () => {
    openConfirm({
      message: "Do you want to delete a asset?",
      onConfirm: async () => {
        await deleteAsset.mutateAsync({
          token,
          assetPath: asset.path,
          contentId: asset._id,
        });

        closeModal();
      },
    });
  };

  const handleUrlCopy = () => {
    setIsUrlCopied(true);

    navigator.clipboard.writeText(asset.url);

    setTimeout(() => {
      setIsUrlCopied(false);
    }, 700);
  };

  return (
    <section className={css.container}>
      <div className={css.header}>
        <div className={css.assetInfo}>
          <div className={css.assetInfoWrapper}>
            <span className={css.assetName}>name: {asset.name}</span>
            <span onClick={handleUrlCopy} className={css.assetUrl}>
              url: {asset.url}
            </span>
            <span>size: {Math.round(asset.size / 1024)}KB</span>
          </div>
          {isUrlCopied && <span>copied!</span>}
          <BsFillTrashFill
            onClick={handleDeleteClick}
            className={css.assetInfoDeleteIcon}
            size={25}
          />
        </div>
        <div className={css.assetInfoBg} />
      </div>
      <div className={css.assetImgWrapper}>
        <img className={css.assetImg} src={asset.url} alt={asset.path} />
      </div>
    </section>
  );
}
