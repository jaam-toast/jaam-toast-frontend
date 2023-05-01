import { Link } from "react-router-dom";
import {
  BsColumnsGap,
  BsFileEarmarkImage,
  BsFillKeyFill,
} from "react-icons/bs";
import { BsStack } from "react-icons/bs";

import { ModalContentsKey } from "./ModalContentsKey";
import { Modal } from "../@shared";
import { ColorBox } from "../@shared/ColorBox";
import { COLORS } from "../@config/colors";
import * as css from "./CmsInfo.css";
import { useModal } from "../@shared";
import { ColorKeys } from "../@config/colors";

type Options = {
  schemaListCount: number;
  userName: string;
  projectName: string;
};

export function CmsInfo({
  schemaListCount,
  userName,
  projectName,
}: Options) {
  const { openModal } = useModal();

  const handleClickKey = () => {
    openModal({
      component: <ModalContentsKey projectName={projectName} />,
    });
  };

  return (
    <>
      <Modal />
      {schemaListCount ? (
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
            <Link to={`/${userName}/${projectName}/contents`}>
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
            <Link to={`/${userName}/${projectName}/assets`}>
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
        <section className={css.emptyCmsSection}>
          <span className={css.infoText}>
            No contents here. <br />
            <strong>Let's create some!</strong> Ready to start?
          </span>
          <div className={css.emptyCmsButtonWrapper}>
            {/**TODO? Quick start */}
            {/* <button className={css.emptyCmsButton}>Quick Start</button> */}
            <Link
              to={`/${userName}/${projectName}/schema`}
              className={css.emptyCmsButton}
            >
              Add Schema
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
