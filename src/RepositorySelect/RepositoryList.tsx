import { useReposQuery } from "./useRepoStore";
import { Avatar } from "../@shared/Avatar";
import * as css from "./RepositoryList.css";

type BuildOptionRepoListProps = {
  searchWord: string;
  onOptionClick: (option: string) => void;
};

function BuildOptionRepoList({
  searchWord,
  onOptionClick,
}: BuildOptionRepoListProps) {
  const { data: repos } = useReposQuery();

  return (
    <div className={css.container}>
      <ul className={css.repoOptionList}>
        {repos
          ?.filter(repo =>
            searchWord ? repo.repoName.includes(searchWord) : true,
          )
          .map((repo, index) => (
            <li key={repo.repoName} className={css.repoOption}>
              <div className={css.repoOptionHead}>
                <Avatar size={2}>1</Avatar>
                <span>{repo.repoName}</span>
              </div>
              <button
                className={css.importButton}
                onClick={() => onOptionClick(repo.repoName.split("/")[1])}
              >
                Import
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BuildOptionRepoList;
