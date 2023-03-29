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

import { useReposQuery } from "src/hooks/useRepoStore";
import { Button, BorderBox } from "../@shared";

type BuildOptionRepoListProps = {
  searchWord: string;
  onOptionClick: (option: string) => void;
};

function BuildOptionRepoList({
  searchWord,
  onOptionClick,
}: BuildOptionRepoListProps) {
  const { data: repos } = useReposQuery();
  const [buttonName, setButtonName] = useState<string>("View All");
  const viewListCount = buttonName === "View All" ? 5 : repos?.length;

  const handleAllClick = async () => {
    setButtonName(buttonName === "View All" ? "Fold" : "View All");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <BorderBox>
        <List
          sx={{
            width: "100%",
          }}
          component="nav"
          aria-label="repo-list"
        >
          {repos
            ?.filter(repo =>
              searchWord ? repo.repoName.includes(searchWord) : true,
            )
            .slice(0, viewListCount)
            .map((repo, index) => (
              <div key={repo.repoName + index}>
                <ListSubheader id="repo-list" />
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
                    onClick={() => onOptionClick(repo.repoName.split("/")[1])}
                  >
                    Import
                  </Button>
                </ListItem>
                {index !== repos.slice(0, viewListCount)?.length - 1 &&
                  !searchWord && <Divider />}
              </div>
            ))}
        </List>
      </BorderBox>
      {(repos?.length ?? 0) > 5 && (
        <Button color="light" onClick={handleAllClick} sx={{ width: "150px" }}>
          {buttonName}
        </Button>
      )}
    </Box>
  );
}

export default BuildOptionRepoList;
