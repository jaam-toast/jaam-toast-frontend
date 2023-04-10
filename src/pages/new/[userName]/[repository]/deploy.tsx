import { useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import BuildStepCard from "src/components/@shared/BuildStepCards";
import useBuildingLog from "src/hooks/useBuildingLog";
import getUserFromCookie from "utils/getUserFromCookie";

import type { BuildOptions } from "types/build";
import type { GetServerSideProps } from "next";

type DeployPageProps = {
  buildOptions: BuildOptions;
};

function DeployPage({ buildOptions }: DeployPageProps) {
  const router = useRouter();
  const [buildingLog, setBuildingLog] = useState<string[]>([]);

  useBuildingLog("projectName", (data: string) => {
    setBuildingLog(prev => prev.concat(data));

    // TODO: Remove. temporary logic.
    if (data === "A new deployment's data is saved successfully!") {
      const { username, repository } = router.query;
      router.push(`/${username}/${repository}/preview`);
    }
  });

  return (
    <div>
      <div>
        <p>Deploy.</p>
        <p>Please follow the steps to configure your Project and deploy it.</p>
      </div>

      <BuildStepCard step={3} />

      <ul>
        {buildingLog.map((log, i) => (
          <li key={log}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  DeployPageProps
> = async context => {
  const buildOptions = getCookie("buildOptions", context);
  const user = getUserFromCookie(context);

  if (!user || !buildOptions || buildOptions === true) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      buildOptions: JSON.parse(buildOptions),
    },
  };
};

export default DeployPage;
