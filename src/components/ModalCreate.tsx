import { useRecoilValue } from "recoil";
import { Box, Typography } from "@mui/material";

import { Button, FormSelectBox } from "./@shared";
import useModal from "../lib/hooks/useModal";
import loginState from "../lib/recoil/auth";
import {
  gitRepoState,
  cloneUrlState,
  gitNamespaceList,
} from "../lib/recoil/git";

import { LoginData } from "../types/auth";
import { GitNamespace, Repo } from "../types/projectOption";

function ModalCreate() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const gitNamespaces = useRecoilValue<GitNamespace[]>(gitNamespaceList);
  const gitRepos = useRecoilValue<Repo[]>(gitRepoState);
  const cloneUrl = useRecoilValue<string>(cloneUrlState);

  const { showModal } = useModal();

  const userId = data._id;

  const handleClickModalBuild = () => {
    showModal({
      modalType: "ModalBuild",
    });
  };

  return (
    <Box sx={style}>
      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h3">
          Create Site
        </Typography>
        {cloneUrl ? (
          <Button
            variant="contained"
            color="dark"
            onClick={handleClickModalBuild}
          >
            Next
          </Button>
        ) : null}
      </Box>
      <Box display="flex" sx={{ flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
            Spaces
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5 }}>
            <FormSelectBox
              label="Select a Git Namespace"
              userId={userId}
              type="spaceChange"
              datas={gitNamespaces}
            />
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography
            id="modal-description"
            variant="body2"
            sx={{ mt: 2, marginLeft: 3 }}
          >
            Repository
          </Typography>
          <Box sx={{ width: "90%", marginTop: 1.5, marginLeft: 3 }}>
            <FormSelectBox
              label="Select a Git Namespace"
              userId={userId}
              type="repoChange"
              datas={gitRepos}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ModalCreate;
