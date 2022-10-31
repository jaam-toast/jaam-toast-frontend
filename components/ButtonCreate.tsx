import { useRecoilValue, useSetRecoilState } from "recoil";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { setCookie } from "cookies-next";
import { getOrgs } from "../lib/api";
import useModal from "../lib/hooks/useModal";

import loginState from "../lib/recoil/auth";
import gitNamespaceState from "../lib/recoil/git/namespace";

import { GitNamespace, LoginData } from "../types";

function ButtonCreate() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const setGitNamespaceState =
    useSetRecoilState<GitNamespace[]>(gitNamespaceState);
  const { showModal } = useModal();

  const userId = data._id;

  const handleClickModalCreate = async () => {
    const { data: userOrgs } = await getOrgs(userId);

    setCookie("userOrgs", JSON.stringify(userOrgs));
    setGitNamespaceState(userOrgs);

    showModal({
      modalType: "ModalCreate",
    });
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Button
        variant="contained"
        sx={{
          m: 1,
          bgcolor: "#000",
          ":hover": {
            bgcolor: "#FFF",
            color: "#000",
          },
        }}
        onClick={handleClickModalCreate}
      >
        New Project
      </Button>
    </Box>
  );
}

export default ButtonCreate;
