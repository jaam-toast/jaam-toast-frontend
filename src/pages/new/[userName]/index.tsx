import { useRecoilValue } from "recoil";
import { Box, Container, Typography } from "@mui/material";
import { getCookie } from "cookies-next";

import {
  BorderBox,
  CenterBox,
  FlexRowCenterBox,
  SearchInput,
} from "src/components/@shared";
import BuildStepCards from "src/components/build/BuildStepCards";
import BuildOptionRepoList from "src/components/build/BuildOptionRepoList";
import BuildOptionSelectBox from "src/components/build/BuildOptionSelectBox";
import loginState from "src/recoil/auth";

import { LoginData } from "src/types/auth";
import type { GitNamespace } from "src/types/projectOption";
import type { GetServerSideProps } from "next";
import { useState } from "react";

type NewProps = {
  spaces: string[];
};

export type Repository = {
  repoName: string;
};

function New({ spaces }: NewProps) {
  // const { data } =
  //   useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  // const gitNamespaces = useRecoilValue<GitNamespace[]>(gitNamespaceList);

  // const userId = data._id;

  const [currentSpace, setCurrentSpace] = useState<GitNamespace | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSpaceClick = async () => {
    setCurrentSpace({
      spaceUrl: "space example spaceUrl 1",
      spaceName: "space example spaceName 1",
    });

    // TODO: fetch repositories.
    const repositoris: Repository[] = [
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
    ];

    setRepos(repositoris);
  };

  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <Box>
        <Typography id="modal-title" variant="h4" component="h3">
          Let's build something new.
        </Typography>
        <Typography id="modal-title" variant="body2" gutterBottom>
          To deploy a new Project, import an existing Git Repository and Enjoy!
        </Typography>
      </Box>
      <BuildStepCards />
      <CenterBox>
        <BorderBox sx={{ boxShadow: 24, p: 4 }}>
          <Box sx={{ width: "100%", maxWidth: 800 }}>
            <Box
              display="flex"
              sx={{
                flexDirection: "column",
              }}
            >
              <FlexRowCenterBox>
                <Typography id="modal-title" variant="h6" component="h3">
                  Import Git Repository
                </Typography>
              </FlexRowCenterBox>
              <FlexRowCenterBox>
                <Box sx={{ width: "48%" }}>
                  <Typography
                    id="modal-description"
                    variant="body2"
                    sx={{ mt: 2 }}
                  >
                    Spaces
                  </Typography>
                  <Box sx={{ marginTop: 1.5 }}>
                    <BuildOptionSelectBox
                      label="Select a Git Namespace"
                      type="spaceChange"
                      datas={spaces}
                      handleOptionClick={handleSpaceClick}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginLeft: 1.5,
                    width: "48%",
                    height: "max-content",
                  }}
                >
                  <Typography
                    id="modal-description"
                    variant="body2"
                    sx={{ mt: 2 }}
                  >
                    Repository
                  </Typography>
                  <Box sx={{ marginTop: 1.5 }}>
                    <SearchInput
                      placeholder="Search.."
                      size="small"
                      sx={{
                        display: "inline-block",
                        width: "100%",
                      }}
                    />
                  </Box>
                </Box>
              </FlexRowCenterBox>
              <BuildOptionRepoList repos={repos} searchWord={searchWord} />
            </Box>
          </Box>
        </BorderBox>
      </CenterBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async ({
  req,
  res,
}) => {
  const loginCookieData = getCookie("loginData", { req, res });

  if (!loginCookieData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // TODO: fetch user spaces.
  const spaces: GitNamespace[] = [
    {
      spaceUrl: "space example spaceUrl 1",
      spaceName: "space example spaceName 1",
    },
    {
      spaceUrl: "space example spaceUrl 2",
      spaceName: "space example spaceName 2",
    },
    {
      spaceUrl: "space example spaceUrl 3",
      spaceName: "space example spaceName 3",
    },
    {
      spaceUrl: "space example spaceUrl 4",
      spaceName: "space example spaceName 4",
    },
  ];

  return {
    props: {
      spaces,
    },
  };
};

export default New;
