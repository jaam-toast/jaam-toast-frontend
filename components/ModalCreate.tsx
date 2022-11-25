import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { getOrgRepos, getUserRepos } from "../lib/api";
import useModal from "../lib/hooks/useModal";

import loginState from "../lib/recoil/auth";
import { gitNamespaceList } from "../lib/recoil/git/namespace";
import gitRepoState from "../lib/recoil/git/repos";
import cloneUrlState from "../lib/recoil/git/clone";

import { LoginData, GitNamespace, Repo } from "../types";

function ModalCreate() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const gitNamespaces = useRecoilValue<GitNamespace[]>(gitNamespaceList);
  const [gitRepos, setGitRepos] = useRecoilState<Repo[]>(gitRepoState);
  const setCloneUrl = useSetRecoilState<string>(cloneUrlState);

  const [spaces, setSpaces] = useState<string>("");
  const [repository, setRepository] = useState<string>("");
  const { showModal } = useModal();

  const userId = data._id;

  const isButtonNext = () => {
    return spaces !== "" && repository !== "";
  };

  const handleClickModalBuild = () => {
    showModal({
      modalType: "ModalBuild",
    });
  };

  const handleSpaceChange = async (e: SelectChangeEvent) => {
    const selectedNamespaceUrl = e.target.value;
    setSpaces(() => selectedNamespaceUrl);

    const spaceOption = selectedNamespaceUrl
      .split("https://api.github.com/")[1]
      .split("/")[0];

    const selectedNamespace = selectedNamespaceUrl
      .split("https://api.github.com/")[1]
      .split("/")[1];

    if (spaceOption === "orgs") {
      const { data: orgRepos } = await getOrgRepos(userId, selectedNamespace);

      return setGitRepos(orgRepos);
    }

    const { data: userRepos } = await getUserRepos(userId);

    return setGitRepos(userRepos);
  };

  const handleRepoChange = (e: SelectChangeEvent) => {
    const selectedRepoUrl = e.target.value;
    setRepository(selectedRepoUrl);

    setCloneUrl(selectedRepoUrl);
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
        {isButtonNext() ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#000",
              ":hover": {
                bgcolor: "#FFF",
                color: "#000",
              },
            }}
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
            <FormControl size="small" fullWidth>
              <InputLabel id="select-label" sx={{ fontSize: "small" }}>
                Select a Git Namespace
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={spaces}
                label="Select a Git Namespace"
                autoFocus
                sx={{ fontSize: "small" }}
                onChange={handleSpaceChange}
              >
                {gitNamespaces.map(space => (
                  <MenuItem
                    key={`${space.spaceName}`}
                    value={space.spaceUrl}
                    sx={{ fontSize: "small" }}
                  >
                    {space.spaceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl size="small" fullWidth>
              <InputLabel id="select-label" sx={{ fontSize: "small" }}>
                Select a Repository
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={repository}
                label="repository"
                sx={{ fontSize: "small" }}
                onChange={handleRepoChange}
              >
                {gitRepos.map(repo => (
                  <MenuItem
                    key={`${repo.repoName}`}
                    value={repo.repoCloneUrl}
                    sx={{ fontSize: "small" }}
                  >
                    {repo.repoName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
