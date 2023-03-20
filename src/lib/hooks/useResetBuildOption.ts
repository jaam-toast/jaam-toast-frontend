import { useEffect } from "react";
import searchWordState from "../recoil/searchWord/atom";
import { buildOptionsState } from "../recoil/buildOptions";
import { useResetRecoilState } from "recoil";

function useResetBuildOption() {
  const resetBuildOption = useResetRecoilState(buildOptionsState);
  const resetSearchWord = useResetRecoilState(searchWordState);

  useEffect(() => {
    resetBuildOption();
    resetSearchWord();
  }, []);
}

export default useResetBuildOption;
