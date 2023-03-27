import { useState } from "react";
import { InputAdornment, TextFieldProps, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import useDebounce from "src/hooks/useDebounce";

type SearchInputProps = TextFieldProps & {
  onSearchInputChange: (word: string) => void;
};

function SearchInput({ onSearchInputChange, ...props }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const onDebounceSaveSearchWord = useDebounce((word: string) => {
    onSearchInputChange(word);
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
