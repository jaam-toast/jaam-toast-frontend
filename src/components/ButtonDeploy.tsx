import { useRecoilState, useRecoilValue } from "recoil";
import { setCookie } from "cookies-next";

import { Button } from "./@shared";
import { deployRepo } from "lib/api";
import { cloneRepoName, cloneUrlState } from "lib/recoil/git";
import buildOptionsState from "lib/recoil/userBuildOptions";
import userDeploymentsState from "lib/recoil/userDeployments";
import getFormattedKoreaTime from "lib/utils/getFormattedKoreaTime";

import { UserDeploymentData } from "types/deployment";
import { BuildOptions } from "types/projectOption";
import { useRouter } from "next/router";

interface ButtonDeployProps {
  userId: string;
}

function ButtonDeploy({ userId }: ButtonDeployProps) {
  const repoName = useRecoilValue<string>(cloneRepoName);
  const repoCloneUrl = useRecoilValue<string>(cloneUrlState);
  const buildOption = useRecoilValue<BuildOptions>(buildOptionsState);
  const [deploymentList, setDeploymentList] =
    useRecoilState<UserDeploymentData[]>(userDeploymentsState);
  const router = useRouter();

  const runDeploy = async () => {
    if (!userId) return;

    const filteredEnvs = buildOption.envList.filter((_, i) => i !== 0);
    const formattedTime = getFormattedKoreaTime(new Date());

    const userBuildOptions = {
      userId,
      repoName,
      repoCloneUrl,
      repoUpdatedAt: formattedTime,
      nodeVersion: buildOption.nodeVersion,
      installCommand: buildOption.installCommand,
      buildCommand: buildOption.buildCommand,
      envList: filteredEnvs,
      buildType: buildOption.buildType,
      lastCommitMessage: "",
    };

    const { data: userDeploymentData } = await deployRepo(userBuildOptions);

    const copyUserDeployData = JSON.parse(JSON.stringify(userDeploymentData));
    copyUserDeployData.buildingLog = [];

    setDeploymentList(prev => [...prev, userDeploymentData]);
    setCookie(
      "userDeployments",
      JSON.stringify([...deploymentList, copyUserDeployData]),
    );

    return userDeploymentData;
  };

  const handleClickDeploy = async () => {
    const { userName, repo } = router.query;
    router.push(`/new/${userName}/${repo}/deploy`);

    try {
      const userDeploymentData = await runDeploy();
      if (!userDeploymentData) throw new Error("error");

      setDeploymentList(prev => [...prev, userDeploymentData]);
    } catch (err) {
      //TODO error 토스트
    }
  };

  return (
    <Button color="light" onClick={handleClickDeploy}>
      Deploy
    </Button>
  );
}

export default ButtonDeploy;
