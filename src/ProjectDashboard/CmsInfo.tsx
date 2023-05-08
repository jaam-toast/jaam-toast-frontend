import { Link } from "react-router-dom";
import {
  BsColumnsGap,
  BsFileEarmarkImage,
  BsFillKeyFill,
} from "react-icons/bs";
import { BsStack } from "react-icons/bs";

import { ColorBox, EmptyCard } from "../@shared";
import { useModal, useProjectQuery } from "../@hooks";
import { ModalContentsKey } from "./ModalContentsKey";
import { COLORS, ColorKeys } from "../@config/colors";
import * as css from "./CmsInfo.css";

type Options = {
  userName: string;
  projectName: string;
};

export function CmsInfo({ userName, projectName }: Options) {
  const { openModal } = useModal();

  const { data: project } = useProjectQuery(projectName);
  const schemaListCount = project?.schemaList?.length || 0;

  const handleClickKey = () => {
    openModal({
      component: <ModalContentsKey projectName={projectName} />,
    });
  };

  return (
    <>
      {schemaListCount || 0 ? (
        <section className={css.cmsInfoSection}>
          <span className={css.infoFieldTitle}>Api Info</span>
          <ul className={css.cmsInfoList}>
            <Link to={`/${userName}/${projectName}/schema`}>
              <li className={css.cmsInfo}>
                <div className={css.cmsInfoLeft}>
                  <ColorBox>
                    <BsColumnsGap color={COLORS.LAVENDAR_DARK} />
                  </ColorBox>
                  <span className={css.infoFieldTitle}>Schema</span>
                </div>
                <p className={css.infoText}>{schemaListCount}</p>
              </li>
            </Link>
            <Link to={`/${userName}/${projectName}/assets`}>
              <li className={css.cmsInfo}>
                <div className={css.cmsInfoLeft}>
                  <ColorBox>
                    <BsFileEarmarkImage color={COLORS.LAVENDAR_DARK} />
                  </ColorBox>
                  <span className={css.infoFieldTitle}>Assets</span>
                </div>
                <p className={css.infoText}>0</p>
              </li>
            </Link>
            <Link to={`/${userName}/${projectName}/contents`}>
              <li className={css.cmsInfo}>
                <div className={css.cmsInfoLeft}>
                  <ColorBox>
                    <BsStack color={COLORS.LAVENDAR_DARK} />
                  </ColorBox>
                  <span className={css.infoFieldTitle}>Contents</span>
                </div>
                <p className={css.infoText}>5</p>
              </li>
            </Link>
            <li className={css.contentsKey} onClick={handleClickKey}>
              <div className={css.cmsInfoLeft}>
                <ColorBox color={COLORS.STRAWBERRY_LIGHT as ColorKeys}>
                  <BsFillKeyFill color={COLORS.STRAWBERRY_LIGHT} />
                </ColorBox>
                <span className={css.infoFieldTitle}>Contents Access Key</span>
              </div>
            </li>
          </ul>
        </section>
      ) : (
        <EmptyCard
          title="No contents here."
          description="Let's create some! Ready to start?"
          link={`/${userName}/${projectName}/schema`}
          linkTitle="Add Schema"
        />
      )}
    </>
  );
}

export function CmsInfoSkeleton() {
  return <div className={css.cmsInfoSectionSkeleton} />;
}
