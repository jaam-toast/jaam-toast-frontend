import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { setCookie } from "cookies-next";
import { Box } from "@mui/material";

import { Button } from "./@shared";
import { getOrgs } from "lib/api";
import loginState from "lib/recoil/auth";
import { cloneUrlState } from "lib/recoil/git";

import { LoginData } from "types/auth";
import { buildStepState } from "lib/recoil/buildOptions";

function ButtonCreate() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const setCloneUrl = useSetRecoilState<string>(cloneUrlState);
  const setBuildStep = useSetRecoilState<number>(buildStepState);
  const router = useRouter();

  const userId = data._id;

  const handleClickModalCreate = async () => {
    const { data: userOrgs } = await getOrgs(userId);

    setCookie("userOrgs", JSON.stringify(userOrgs));
    setCloneUrl("");
    setBuildStep(1);

    router.push(`/new/${data.username}`);
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Button
        variant="contained"
        color="dark"
        sx={{ m: 1 }}
        onClick={handleClickModalCreate}
      >
        New Project
      </Button>
    </Box>
  );
}

export default ButtonCreate;
