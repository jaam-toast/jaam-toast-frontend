import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

import {
  BorderBox,
  CenterBox,
  FlexRowCenterBox,
  SearchInput,
} from "src/components/@shared";
import BuildStepCards from "src/components/build/BuildStepCards";
import BuildOptionRepoList from "src/components/build/BuildOptionRepoList";
import SelectBox from "src/components/build/SelectBox";

import type { GetServerSideProps } from "next";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import Config from "src/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import useUser, { User } from "src/hooks/useUser";

type NewProps = {
  dehydratedState?: DehydratedState;
};

export type Repository = {
  repoName: string;
};

type Space = {
  spaceName: string;
  spaceUrl: string;
  spaceImage: string;
};

type GetOrgsResponse = {
  message: string;
  result: Space[];
};

function New() {
  const { user } = useUser();
  const router = useRouter();
  const [currentSpace, setCurrentSpace] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");

  if (!user) {
    return router.push("/");
  }

  const setRepositoryClick = (repo: string) => {
    const { userName } = router.query;
    router.push(`${userName}/${repo}`);
  };
  const { data: spaces } = useQuery(["new-page", "spaces"], async () => {
    const { data } = await axios.get<GetOrgsResponse>(
      `${Config.SERVER_URL_API}/users/${user.id}/orgs?githubAccessToken=${user.githubAccessToken}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );

    return [
      ...data.result,
      {
        spaceName: user.name,
        spaceUrl: user.githubUri,
        spaceImage: user.image,
      },
    ];
  });

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

      <BuildStepCards step={1} />

      {/* // TODO: make GithubRepositorySelection component */}
      {/* // TODO: onRepositorySelect={(repository: Repository) => } */}
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
                    <SelectBox
                      handleOptionClick={setCurrentSpace}
                      label="Select a Git Namespace"
                      options={spaces?.map(({ spaceName }) => spaceName) ?? []}
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
                      onSearchInputChange={setSearchWord}
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
              <BuildOptionRepoList
                space={currentSpace}
                searchWord={searchWord}
                onOptionClick={setRepositoryClick}
              />
            </Box>
          </Box>
        </BorderBox>
      </CenterBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<NewProps> = async ({
  req,
  res,
}) => {
  // TODO: get user data without getCookie.
  const queryClient = new QueryClient();
  const loginCookieData = getCookie("loginData", { req, res });

  if (!loginCookieData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // TODO: make prefetch hook.
  const user: User =
    typeof loginCookieData === "boolean" ? {} : JSON.parse(loginCookieData);
  await queryClient.prefetchQuery(["new-page", "spaces"], async () => {
    const { data } = await axios.get<GetOrgsResponse>(
      `${Config.SERVER_URL_API}/users/${user.id}/orgs?githubAccessToken=${user.githubAccessToken}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );

    return [
      ...data.result,
      {
        spaceName: user.name,
        spaceUrl: user.githubUri,
        spaceImage: user.image,
      },
    ];
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default New;
