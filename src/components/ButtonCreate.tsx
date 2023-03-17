import { useRecoilValue, useSetRecoilState } from "recoil";
import { setCookie } from "cookies-next";
import { Box } from "@mui/material";

import Button from "./@shared/Button";
import { getOrgs } from "../lib/api";
import useModal from "../lib/hooks/useModal";
import loginState from "../lib/recoil/auth";
import { gitNamespaceState, cloneUrlState } from "../lib/recoil/git";

import { GitNamespace, LoginData } from "../types";
import cloneUrlState from "src/lib/recoil/git/clone";

function ButtonCreate() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const setGitNamespaceState =
    useSetRecoilState<GitNamespace[]>(gitNamespaceState);
  const setCloneUrl = useSetRecoilState<string>(cloneUrlState);

  const { showModal } = useModal();

  const userId = data._id;

  const handleClickModalCreate = async () => {
    const { data: userOrgs } = await getOrgs(userId);

    setCookie("userOrgs", JSON.stringify(userOrgs));
    setGitNamespaceState(userOrgs);
    setCloneUrl("");

    showModal({
      modalType: "ModalCreate",
    });
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
