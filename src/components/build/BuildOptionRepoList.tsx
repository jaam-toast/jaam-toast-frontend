import { useState } from "react";
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

import type { Repository } from "src/pages/new/[userName]";

type BuildOptionRepoListProps = {
  space: string | null;
  searchWord: string;
  onOptionClick: (option: string) => void;
};

function BuildOptionRepoList({
  space,
  searchWord,
  onOptionClick,
}: BuildOptionRepoListProps) {
  // TODO: fetch repositories.
  const repos: Repository[] = [
    {
      repoName: "example repository 1",
    },
    {
      repoName: "example repository 2",
    },
    {
      repoName: "example repository 3",
    },
    {
      repoName: "example repository 4",
    },
    {
      repoName: "example repository 5",
    },
    {
      repoName: "example repository 6",
    },
  ];
  const [buttonName, setButtonName] = useState<string>("View All");
  const handleAllClick = async () => {
    setButtonName(buttonName === "View All" ? "Fold" : "View All");
  };
  const viewListCount = buttonName === "View All" ? 5 : repos.length;

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
                .slice(0, viewListCount)
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
                        onClick={() => onOptionClick(repo.repoName)}
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
