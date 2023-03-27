import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
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
import useUser from "src/hooks/useUser";
import Config from "src/config";

import type { Repo, Response } from "types/api";

type BuildOptionRepoListProps = {
  space: string;
  searchWord: string;
  onOptionClick: (option: string) => void;
};

function BuildOptionRepoList({
  space,
  searchWord,
  onOptionClick,
}: BuildOptionRepoListProps) {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const { data } = useQuery({
    queryKey: ["repos", space],
    queryFn: async () => {
      const { data } =
        space === user.name
          ? await axios.get<Response<Repo[]>>(
              `${Config.SERVER_URL_API}/users/${user.id}/repos?githubAccessToken=${user.githubAccessToken}`,
              {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                },
              },
            )
          : await axios.get<Response<Repo[]>>(
              `${Config.SERVER_URL_API}/users/${user.id}/orgs/${space}/repos?githubAccessToken=${user.githubAccessToken}`,
              {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                },
              },
            );

      return data.result;
    },
  });
  const repos = data ?? [];
  const [buttonName, setButtonName] = useState<string>("View All");
  const handleAllClick = async () => {
    setButtonName(buttonName === "View All" ? "Fold" : "View All");
  };
  const viewListCount = buttonName === "View All" ? 5 : repos.length;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <>
        <BorderBox>
          <List
            sx={{
              width: "100%",
            }}
            component="nav"
            aria-label="repo-list"
          >
            {repos
              .filter(repo =>
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
    </Box>
  );
}

export default BuildOptionRepoList;
