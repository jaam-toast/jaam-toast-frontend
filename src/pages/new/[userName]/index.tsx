import { Suspense, useState } from "react";
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
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
import { useSpaceQuery, spacePrefetchQuery } from "src/hooks/useSpaceQuery";
import { useSpaceActions } from "src/hooks/useRepoStore";
import { useProjectNameActions } from "src/hooks/useProjectNameStore";
import getUserFromCookie from "utils/getUserFromCookie";

import type { GetServerSideProps } from "next";

type NewPageProps = {
  dehydratedState?: DehydratedState;
};

function NewPage() {
  const router = useRouter();
  const { data: spaces } = useSpaceQuery();
  const { setSpace, setRepo } = useSpaceActions();
  const { setDefaultProjectName } = useProjectNameActions();
  const [searchWord, setSearchWord] = useState<string>("");

  const handleRepoClick = (repo: string) => {
    const { userName } = router.query;

    setRepo(repo);
    setDefaultProjectName(repo);
    router.push(`${userName}/${repo}`);
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
                      onSelectionChange={setSpace}
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
              <Suspense fallback={<h1>로딩중</h1>}>
                <BuildOptionRepoList
                  searchWord={searchWord}
                  onOptionClick={handleRepoClick}
                />
              </Suspense>
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
  const user = getUserFromCookie({ req, res });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  await queryClient.prefetchQuery(spacePrefetchQuery(user));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default NewPage;
