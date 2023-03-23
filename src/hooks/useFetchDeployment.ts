import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { setCookie } from "cookies-next";

import { getUserDeployments } from "src/api/index";
import { userDeploymentsState } from "src/recoil/userDeployments";

import { UserDeploymentData } from "types/deployment";

function useFetchDeployment(userId: string) {
  // const [userDeploymentsList, setUserDeploymentsList] =
  //   useRecoilState<UserDeploymentData[]>(userDeploymentsState);

  useEffect(() => {
    if (!userId) return;

    const handleUserDeployments = async () => {
      try {
        const { data: userDeployments } = await getUserDeployments(userId);

        const copyUserDeployments: UserDeploymentData[] = JSON.parse(
          JSON.stringify(userDeployments),
        );

        const filteredUserDeployments = copyUserDeployments.map(deployData => {
          const filteredDeployData = deployData;
          filteredDeployData.buildingLog = [];

          return filteredDeployData;
        });

        // setUserDeploymentsList(userDeployments);
        // setCookie("userDeployments", JSON.stringify(filteredUserDeployments));
      } catch (error) {
        console.info(error);
      }
    };

    handleUserDeployments();
  }, [userId]);

  // return userDeploymentsList;
}

export default useFetchDeployment;
