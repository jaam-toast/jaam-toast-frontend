import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { TextField } from ".";
import useDebounce from "lib/hooks/useDebounce";
import searchWordState from "lib/recoil/searchWord/atom";

function SearchInput({ ...props }) {
  const setSearchWord = useSetRecoilState(searchWordState);

  const onDebouncedEmailChangeListener = useDebounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchWord(e.target.value);
    },
    500,
  );

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={onDebouncedEmailChangeListener}
      {...props}
    />
  );
}

export default SearchInput;
