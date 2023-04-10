import { useState } from "react";

import { useReposQuery } from "src/hooks/useRepoStore";

type BuildOptionRepoListProps = {
  searchWord: string;
  onOptionClick: (option: string) => void;
};

function BuildOptionRepoList({
  searchWord,
  onOptionClick,
}: BuildOptionRepoListProps) {
  const { data: repos } = useReposQuery();
  const [buttonName, setButtonName] = useState<string>("View All");
  const viewListCount = buttonName === "View All" ? 5 : repos?.length;

  const handleAllClick = async () => {
    setButtonName(buttonName === "View All" ? "Fold" : "View All");
  };

  return (
    <div>
      <ul>
        {repos
          ?.filter(repo =>
            searchWord ? repo.repoName.includes(searchWord) : true,
          )
          .slice(0, viewListCount)
          .map((repo, index) => (
            <li key={repo.repoName + index}>
              <p>{repo.repoName}</p>
              <button
                color="dark"
                onClick={() => onOptionClick(repo.repoName.split("/")[1])}
              >
                Import
              </button>
              {index !== repos.slice(0, viewListCount)?.length - 1 &&
                !searchWord &&
                "divider"}
            </li>
          ))}
      </ul>
      {(repos?.length ?? 0) > 5 && (
        <button color="light" onClick={handleAllClick}>
          {buttonName}
        </button>
      )}
    </div>
  );
}

export default BuildOptionRepoList;
