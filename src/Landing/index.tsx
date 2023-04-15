import { useEffect, useState } from "react";
import Config from "../@config";
import * as css from "./index.css";

export function Landing() {
  const [tick, setTick] = useState<Boolean>(true);

  useEffect(() => {
    const tickTimer = setTimeout(() => {
      setTick(!tick);
    }, 800);

    return () => {
      clearTimeout(tickTimer);
    };
  }, [tick]);

  const githubLoginUrl = `//${Config.GITHUB_OAUTH_URI}?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=${Config.API_SCOPE}`;

  return (
    <div className={css.container}>
      <div className={css.mainSectoin}>
        <h1 className={css.mainCopy}>
          Bringing Digital
          <br />
          Ideas to Life{tick && "."}
        </h1>
        <h2 className={css.subCopy}>
          Jaam Toast를 이용하여 웹사이트 배포를 간편하게.
          <br />
          Github 저장소를 가져와 손쉽게 웹사이트를 만들 수 있으며,
          <br />
          언제든지 업데이트 할 수 있습니다.
        </h2>
        <div>
          <a href={githubLoginUrl} className={css.loginButton}>
            Continue with GitHub
          </a>
        </div>
      </div>
      <footer className={css.footer}>
        Every deployment from the 2023 edition of Jaam Toast.
      </footer>
    </div>
  );
}
