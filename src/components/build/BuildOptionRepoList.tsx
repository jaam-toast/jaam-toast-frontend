import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Button, BorderBox } from "../@shared";
import searchWordState from "lib/recoil/searchWord/atom";
import {
  cloneUrlState,
  currentNamespaceState,
  gitRepoState,
} from "lib/recoil/git/atom";
import useDeployEventHandler from "lib/hooks/useDeployEventHandler";

import { Repo } from "types/projectOption";

function BuildOptionRepoList() {
  const gitRepos = useRecoilValue<Repo[]>(gitRepoState);
  const searchWord = useRecoilValue(searchWordState);
  const currentNamespace = useRecoilValue(currentNamespaceState);
  const setCloneUrl = useSetRecoilState<string>(cloneUrlState);

  const [viewListCount, setViewListCount] = useState<number>(5);
  const [buttonName, setButtonName] = useState<string>("View All");
  const [clickedRepo, setClickedRepo] = useState();
  const router = useRouter();
  const addRepo = useDeployEventHandler("repoClick") as (repo: Repo) => void;
  const { userName } = router.query;

  const handleImportClick = (repo: Repo) => {
    // setCloneUrl();
    addRepo(repo);
    router.push(`/new/${repo.repoName}`);
  };

  const handleAllClick = async () => {
    setViewListCount(buttonName === "View All" ? gitRepos.length : 5);
    setButtonName(() => (buttonName === "View All" ? "Fold" : "View All"));
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!!gitRepos.length && (
        <>
          <BorderBox>
            <List
              sx={{
                width: "100%",
              }}
              component="nav"
              aria-label="repository-list"
            >
              {gitRepos
                .filter(repo =>
                  searchWord ? repo.repoName.includes(searchWord) : true,
                )
                .slice(0, searchWord ? gitRepos.length : viewListCount)
                .map((repo, index) => (
                  <>
                    <ListSubheader id="repository-list" />
                    <ListItem>
                      <ListItemIcon>
                        <GitHubIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={repo.repoName}
                        primaryTypographyProps={{ fontSize: 15 }}
                      />
                      <Button
                        color="dark"
                        onClick={() => handleImportClick(repo)}
                      >
                        Import
                      </Button>
                    </ListItem>
                    {index !== gitRepos.slice(0, viewListCount).length - 1 &&
                      !searchWord && <Divider />}
                  </>
                ))}
            </List>
          </BorderBox>
          {gitRepos.length > 5 && (
            <Button
              color="light"
              onClick={handleAllClick}
              sx={{ width: "150px" }}
            >
              {buttonName}
            </Button>
          )}
        </>
      )}
    </Box>
  );
}

export default BuildOptionRepoList;
