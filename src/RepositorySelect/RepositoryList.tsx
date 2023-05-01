import { Avatar, AvatarSkeleton } from "../@shared";
import { useReposQuery } from "../@hooks";
import * as css from "./RepositoryList.css";

type RepositoryListProps = {
  searchWord: string;
  onOptionClick: (option: string) => void;
};

export function RepositoryList({
  searchWord,
  onOptionClick,
}: RepositoryListProps) {
  const { data: repos } = useReposQuery();

  return (
    <div className={css.container}>
      <ul className={css.repoOptionList}>
        {repos
          ?.filter(repo =>
            searchWord ? repo.repoName.includes(searchWord) : true,
          )
          .map(repo => (
            <li key={repo.repoName} className={css.repoOption}>
              <div className={css.repoOptionHead}>
                <Avatar size="small">
                  <div className={css.packageIcon} />
                </Avatar>
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

export function RepositoryListSkeleton() {
  return (
    <ul className={css.repoOptionList}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li key={idx} className={css.repoOption}>
          <div className={css.repoOptionHead}>
            <AvatarSkeleton size="small" />
            <div className={css.textSkeleton} />
          </div>
          <div className={css.buttonSkeleton} />
        </li>
      ))}
    </ul>
  );
}
