import { useEffect, useState } from "react";

// import useAuth from "src/hooks/useAuth";
import * as css from "./index.css";

export function Landing() {
  // const { login } = useAuth();
  const [tick, setTick] = useState<Boolean>(true);

  useEffect(() => {
    const tickTimer = setTimeout(() => {
      setTick(!tick);
    }, 800);

    return () => {
      clearTimeout(tickTimer);
    };
  }, [tick]);

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
          <button className={css.button} onClick={() => {}}>
            {/* <GitHubIcon /> */}
            Continue with GitHub
            {/* <CallMadeIcon /> */}
          </button>
        </div>
      </div>
    </div>
  );
}
