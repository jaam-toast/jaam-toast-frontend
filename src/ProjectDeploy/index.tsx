import { Suspense, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { Preview, PreviewSkeleton } from "./Preview";
import { BuildStepCard } from "../@shared";
import { useBuildingLog } from "./useBuildingLog";
import { useBuildOptions } from "../BuildOptionSelect/useBuildOptionsStore";
import * as css from "./index.css";

export function ProjectDeploy() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const logListRef = useRef<HTMLUListElement>(null);
  const [buildingLog, setBuildingLog] = useState<string[]>([]);
  const [isBuildLogFold, setIsBuildLogFold] = useState<boolean>(false);
  const [deployedUrl, setDeployedUrl] = useState<string>("");
  const buildOptions = useBuildOptions();

  if (!buildOptions.projectName) {
    return (
      <Navigate
        to="/error"
        state={{ code: 401, message: "비정상적인 접근입니다." }}
      />
    );
  }

  useBuildingLog({
    projectName: buildOptions.projectName ?? "",
    onLog: (data: string) => {
      setBuildingLog(prev => prev.concat(data));

      if (!logListRef.current) {
        return;
      }

      logListRef.current.scrollTo({
        top: Number.MAX_SAFE_INTEGER,
        behavior: "smooth",
      });
    },
    onComplete: (data: string) => {
      const regExp = /\{([^}]+)\}/g;
      const resultMessage = data.match(regExp)?.pop() as string;
      const { buildOriginalDomain } = JSON.parse(resultMessage);

      setIsBuildLogFold(true);

      setTimeout(() => {
        setDeployedUrl(`https://${buildOriginalDomain}`);
      }, 500);

      setTimeout(() => {
        window.location.href = "#complete";
      }, 1000);
    },
    onError: () => {
      navigate("/error", {
        state: {
          code: 500,
          message: "배포 진행 중 알 수 없는 에러가 발생했습니다.",
        },
      });
    },
  });

  return (
    <div className={css.container}>
      <section className={css.titleSection}>
        <h2 className={css.mainTitle}>Deploy.</h2>
        <p className={css.subTitle}>
          Please follow the steps to configure your Project and deploy it.
        </p>
      </section>

      <BuildStepCard step={3} />

      <section
        className={css.buildLogSection}
        onClick={() => setIsBuildLogFold(!isBuildLogFold)}
      >
        <h3 className={css.sectionTitle}>Build Log</h3>
        <ul
          className={isBuildLogFold ? css.hide : css.buildLogList}
          ref={logListRef}
        >
          {buildingLog.map((log, i) => (
            <li className={css.log} key={log + i}>
              {log}
            </li>
          ))}
        </ul>
      </section>

      <section className={css.previewSection} id="complete">
        <h3 className={css.sectionTitle}>Complete!</h3>
        <div className={deployedUrl ? css.mainSection : css.hide}>
          {deployedUrl && (
            <Suspense fallback={<PreviewSkeleton />}>
              <Preview url={deployedUrl} />
            </Suspense>
          )}
          <div className={css.buttonConsole}>
            <a className={css.previewOptionButton} href={deployedUrl}>
              visit to site
            </a>
            <Link
              className={css.previewOptionButton}
              to={`/${userName}/${buildOptions.projectName}/dashboard`}
            >
              go to dashboard
            </Link>
            <Link className={css.previewOptionButton} to="/projects">
              go to main
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
