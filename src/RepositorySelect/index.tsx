import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BuildStepCard, TextField, SelectBox, EmptyCard } from "../@shared";
import { RepositoryList, RepositoryListSkeleton } from "./RepositoryList";
import {
  useSpaceQuery,
  PresetBuildOptionStore,
  usePresetBuildOptionStore,
} from "../@hooks";
import * as css from "./index.css";

export function RepositorySelect() {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState<string>("");
  const { space, setSpace, setRepoName } = usePresetBuildOptionStore(
    (store: PresetBuildOptionStore) => ({
      setSpace: store.actions.setSpace,
      setRepoName: store.actions.setRepoName,
      space: store.space,
    }),
  );
  const { data: spaces } = useSpaceQuery();

  const handleRepoClick = (repo: string) => {
    setRepoName(repo);
    navigate(`/new/${space}/${repo}`);
  };

  const handleSpaceClick = (selectedSpace: string) => {
    if (!spaces) {
      return;
    }

    if (selectedSpace === "+ Add Repository") {
      return window.open(
        "https://github.com/apps/jaam-toast/installations/new",
      );
    }

    const space = spaces.find(({ spaceName }) => spaceName == selectedSpace);

    if (!space) {
      return;
    }

    setSpace(space);
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

      <section className={css.repositorySection}>
        <div className={css.searchConsole}>
          <SelectBox
            onSelectionChange={handleSpaceClick}
            options={
              spaces
                ? [
                    ...spaces?.map(({ spaceName }) => spaceName),
                    "+ Add Repository",
                  ]
                : []
            }
          />
          <div className={css.textFieldSection}>
            <TextField
              onTextFieldChange={setSearchWord}
              placeholder="Search.."
            />
          </div>
        </div>
        {space ? (
          <Suspense fallback={<RepositoryListSkeleton />}>
            <RepositoryList
              searchWord={searchWord}
              onOptionClick={handleRepoClick}
            />
          </Suspense>
        ) : (
          <div className={css.githubSettingMessage}>
            {!spaces?.length && (
              <EmptyCard
                title="There are no registered repositories."
                description="Please register your GitHub to add."
                link="https://github.com/apps/jaam-toast/installations/new"
                linkTitle="Adjust GitHub App Permissions"
              />
            )}
            <p className={css.selectMessage}>Select your github repository.</p>
          </div>
        )}
      </section>
    </div>
  );
}
