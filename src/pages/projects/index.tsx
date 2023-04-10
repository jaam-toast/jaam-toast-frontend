import { Suspense, useState } from "react";
import { useRouter } from "next/router";

import ProjectList from "src/components/ProjectList/ProjectCardList";
import TextField from "src/components/@shared/TextField";
import { useUser } from "src/hooks/useUserStore";
import getUserFromCookie from "utils/getUserFromCookie";
import * as css from "./index.css";

import type { GetServerSideProps } from "next";

function ProjectListPage() {
  const user = useUser();
  const router = useRouter();
  const [searchword, setSearchword] = useState<string>("");

  const handleCreateProjectClick = () => {
    router.push(`/new/${user!.name}`);
  };

  return (
    <div className={css.container}>
      {/* //TODO: make variant. */}
      <section className={css.explorerSection}>
        <div className={css.searchInput}>
          <TextField
            onTextFieldChange={setSearchword}
            placeholder="Search..."
          />
        </div>
        <button
          className={css.newProjectButton}
          onClick={handleCreateProjectClick}
        >
          New Project
        </button>
      </section>
      {/* // TODO: Skeleton UI */}
      <Suspense fallback={<h1>로딩 중</h1>}>
        <ProjectList searchword={searchword} />
      </Suspense>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
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

  return {
    props: {},
  };
};

export default ProjectListPage;
