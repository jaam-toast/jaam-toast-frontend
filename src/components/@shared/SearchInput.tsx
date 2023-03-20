import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { TextField } from ".";
import useDebounce from "lib/hooks/useDebounce";
import searchWordState from "lib/recoil/searchWord/atom";

function SearchInput({ ...props }) {
  const [inputValue, setInputValue] = useState("");
  const setSearchWord = useSetRecoilState(searchWordState);

  const onDebounceSaveSearchWord = useDebounce((word: string) => {
    setSearchWord(word);
  }, 500);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value);
        onDebounceSaveSearchWord(e.target.value);
      }}
      {...props}
    />
  );
}

export default SearchInput;
