import { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallMadeIcon from "@mui/icons-material/CallMade";

import useAuth from "src/hooks/useAuth";
import getUserFromCookie from "utils/getUserFromCookie";
import * as css from "src/pages/index.css";

import type { GetServerSideProps } from "next";

function LandingPage() {
  const { login } = useAuth();
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
          <button className={css.button} onClick={login}>
            <GitHubIcon />
            Continue with GitHub
            <CallMadeIcon />
          </button>
        </div>
      </div>
      <footer className={css.footer}>
        Every deployment from the 2023 edition of Jaam Toast.
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  const user = getUserFromCookie({ req, res });

  if (!!user) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LandingPage;
