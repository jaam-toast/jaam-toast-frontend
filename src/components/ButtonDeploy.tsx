import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { setCookie } from "cookies-next";

import { Button } from "./@shared";
import { deployRepo } from "src/api";
import { cloneRepoName, cloneUrlState } from "src/recoil/git";
import { buildOptionsState, buildStepState } from "src/recoil/buildOptions";
import { userDeploymentsState } from "src/recoil/userDeployments";
import getFormattedKoreaTime from "src/utils/getFormattedKoreaTime";

import { UserDeploymentData } from "types/deployment";
import { BuildOptions } from "types/projectOption";
import { useRouter } from "next/router";

interface ButtonDeployProps {
  userId?: string;
}

function ButtonDeploy({ userId }: ButtonDeployProps) {
  // TODO: 분리하지 말고 다시 묶기
  // const repoName = useRecoilValue<string>(cloneRepoName);
  // const repoCloneUrl = useRecoilValue<string>(cloneUrlState);
  // const buildOption = useRecoilValue<BuildOptions>(buildOptionsState);
  // const [deploymentList, setDeploymentList] =
  //   useRecoilState<UserDeploymentData[]>(userDeploymentsState);
  // const setBuildStep = useSetRecoilState<number>(buildStepState);
  const router = useRouter();

  const runDeploy = async () => {
    if (!userId) return;

    // const filteredEnvs = buildOption.envList.filter((_, i) => i !== 0);
    const formattedTime = getFormattedKoreaTime(new Date());

    // const userBuildOptions = {
    //   userId,
    //   repoName,
    //   repoCloneUrl,
    //   repoUpdatedAt: formattedTime,
    //   subDomain: buildOption.subDomain,
    //   nodeVersion: buildOption.nodeVersion,
    //   installCommand: buildOption.installCommand,
    //   buildCommand: buildOption.buildCommand,
    //   envList: filteredEnvs,
    //   buildType: buildOption.buildType,
    //   lastCommitMessage: "",
    // };

    // const { data: userDeploymentData } = await deployRepo(userBuildOptions);

    // const copyUserDeployData = JSON.parse(JSON.stringify(userDeploymentData));
    // copyUserDeployData.buildingLog = [];

    // setDeploymentList(prev => [...prev, userDeploymentData]);
    // setCookie(
    //   "userDeployments",
    //   JSON.stringify([...deploymentList, copyUserDeployData]),
    // );

    // return userDeploymentData;
  };

  const handleClickDeploy = async () => {
    const { userName, repo } = router.query;

    // setBuildStep(3);
    router.push(`/new/${userName}/${repo}/deploy`);

    try {
      // const userDeploymentData = await runDeploy();
      // if (!userDeploymentData) throw new Error("error");
      // setDeploymentList(prev => [...prev, userDeploymentData]);
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
