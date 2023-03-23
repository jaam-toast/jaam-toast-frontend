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
import { buildStepState } from "src/recoil/buildOptions";
import searchWordState from "src/recoil/searchWord/atom";
import { cloneUrlState, gitRepoState } from "src/recoil/git/atom";

import { Repo } from "types/projectOption";
import { Repository } from "src/pages/new/[userName]";

type BuildOptionRepoListProps = {
  repos: Repository[];
  searchWord: string;
};

function BuildOptionRepoList({ repos, searchWord }: BuildOptionRepoListProps) {
  // const gitRepos = useRecoilValue<Repo[]>(gitRepoState);
  // const searchWord = useRecoilValue(searchWordState);
  // const setCloneUrl = useSetRecoilState<string>(cloneUrlState);
  // const setBuildStep = useSetRecoilState<number>(buildStepState);

  // const [viewListCount, setViewListCount] = useState<number>(5);
  const [buttonName, setButtonName] = useState<string>("View All");
  const router = useRouter();

  const handleImportClick = (repo: Repo) => {
    // setCloneUrl(repo.repoCloneUrl);
    // setBuildStep(2);

    router.push(`/new/${repo.repoName}`);
  };

  const handleAllClick = async () => {
    // setViewListCount(buttonName === "View All" ? gitRepos.length : 5);
    setButtonName(buttonName === "View All" ? "Fold" : "View All");
  };

  const viewListCount = buttonName === "View All" ? repos.length : 5;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!!repos.length && (
        <>
          <BorderBox>
            <List
              sx={{
                width: "100%",
              }}
              component="nav"
              aria-label="repository-list"
            >
              {repos
                .filter(repo =>
                  searchWord ? repo.repoName.includes(searchWord) : true,
                )
                .slice(0, buttonName === "View All" ? repos.length : 5)
                .map((repo, index) => (
                  <div key={repo.repoName + index}>
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
                    {index !== repos.slice(0, viewListCount).length - 1 &&
                      !searchWord && <Divider />}
                  </div>
                ))}
            </List>
          </BorderBox>
          {repos.length > 5 && (
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
