import { useState } from "react";

import useDebounce from "src/hooks/useDebounce";

type SearchInputProps = {
  onSearchInputChange: (word: string) => void;
};

function SearchInput({ onSearchInputChange, ...props }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const onDebounceSaveSearchWord = useDebounce((word: string) => {
    onSearchInputChange(word);
  }, 500);

  return (
    <input
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value);
        onDebounceSaveSearchWord(e.target.value);
      }}
    />
  );
}

export default SearchInput;
