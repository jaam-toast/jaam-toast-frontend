import { Suspense, useState } from "react";
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import TextField from "src/components/@shared/TextField";
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
    <div>
      <div>
        <p>Let's build something new.</p>
        <p>
          To deploy a new Project, import an existing Git Repository and Enjoy!
        </p>
      </div>

      <BuildStepCards step={1} />

      {/* // TODO: make GithubRepoSelection component */}
      {/* // TODO: onRepoSelect={(repo: Repo) => } */}
      <div>
        <h2>Import Git Repository</h2>
        <div>
          <p>Spaces</p>
          <div>
            <SelectBox
              onSelectionChange={setSpace}
              label="Select a Git Namespace"
              options={spaces?.map(({ spaceName }) => spaceName) ?? []}
            />
          </div>
          <div>
            <p>Repository</p>
            <div>
              <TextField
                onTextFieldChange={setSearchWord}
                placeholder="Search.."
              />
            </div>
          </div>
        </div>
        {/* // TODO: Skeleton UI (fetching & searching)*/}
        <Suspense fallback={<h1>로딩중</h1>}>
          <BuildOptionRepoList
            searchWord={searchWord}
            onOptionClick={handleRepoClick}
          />
        </Suspense>
      </div>
    </div>
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
