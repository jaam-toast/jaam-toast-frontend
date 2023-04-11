import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BuildStepCard, TextField, SelectBox } from "../@shared";
import BuildOptionRepoList from "./RepositoryList";
import { useSpaceQuery } from "./useSpaceQuery";
import { useSpace, useSpaceActions } from "./useRepoStore";
import { useProjectNameActions } from "../@shared/useProjectNameStore";
import * as css from "./index.css";

export function RepositorySelect() {
  const navigate = useNavigate();
  const space = useSpace();
  const { data: spaces } = useSpaceQuery();
  const { setSpace, setRepo } = useSpaceActions();
  const { setDefaultProjectName } = useProjectNameActions();
  const [searchWord, setSearchWord] = useState<string>("");

  const handleRepoClick = (repo: string) => {
    setRepo(repo);
    setDefaultProjectName(repo);
    navigate(`./${repo}`);
  };

  return (
    <div className={css.container}>
      <section className={css.titleSection}>
        <h2 className={css.mainTitle}>Let's build something new.</h2>
        <p className={css.subTitle}>
          To deploy a new Project, import an existing Git Repository and Enjoy!
        </p>
      </section>

      <BuildStepCard step={1} />

      {/* // TODO: make GithubRepoSelection component */}
      {/* // TODO: onRepoSelect={(repo: Repo) => } */}
      <section className={css.repositorySection}>
        <div className={css.searchConsole}>
          <SelectBox
            onSelectionChange={setSpace}
            label="Select a Git Namespace"
            options={spaces?.map(({ spaceName }) => spaceName) ?? []}
          />
          <div className={css.textFieldSection}>
            <TextField
              onTextFieldChange={setSearchWord}
              placeholder="Search.."
            />
          </div>
        </div>
        {/* // TODO: Skeleton UI (fetching & searching)*/}
        {space ? (
          <Suspense fallback={<h1>로딩 중...</h1>}>
            <BuildOptionRepoList
              searchWord={searchWord}
              onOptionClick={handleRepoClick}
            />
          </Suspense>
        ) : (
          <p className={css.selectMessage}>Select your github repository.</p>
        )}
      </section>
    </div>
  );
}
