import { useState } from "react";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";

import {
  BorderBox,
  CenterBox,
  FlexRowCenterBox,
  SearchInput,
} from "src/components/@shared";
import BuildStepCards from "src/components/@shared/BuildStepCards";
import BuildOptionRepoList from "src/components/New/BuildOptionRepoList";
import SelectBox from "src/components/@shared/SelectBox";
import useUser from "src/hooks/useUser";
import getUserFromCookie from "utils/getUserFromCookie";
import Config from "src/config";

import type { GetServerSideProps } from "next";
import type { Response, Space } from "types/api";

type NewPageProps = {
  dehydratedState?: DehydratedState;
};

function NewPage() {
  const { user } = useUser();
  const router = useRouter();
  const [currentSpace, setCurrentSpace] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");

  if (!user) {
    return router.push("/");
  }

  const handleRepoClick = (repo: string) => {
    const { userName } = router.query;
    router.push(`${userName}/${repo}`);
  };
  const { data: spaces } = useQuery({
    queryKey: ["spaces"],
    queryFn: async () => {
      const { data } = await axios.get<Response<Space[]>>(
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
    },
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

      {/* // TODO: make GithubRepoSelection component */}
      {/* // TODO: onRepoSelect={(repo: Repo) => } */}
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
                      onSelectionChange={setCurrentSpace}
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
              {/* // TODO: Skeleton UI (fetching & searching)*/}
              {currentSpace && (
                <BuildOptionRepoList
                  space={currentSpace}
                  searchWord={searchWord}
                  onOptionClick={handleRepoClick}
                  key={currentSpace}
                />
              )}
            </Box>
          </Box>
        </BorderBox>
      </CenterBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<NewPageProps> = async ({
  req,
  res,
}) => {
  // TODO: get user data without getCookie.
  const user = getUserFromCookie({ req, res });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["spaces"],
    queryFn: async () => {
      const { data } = await axios.get<Response<Space[]>>(
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
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default NewPage;
