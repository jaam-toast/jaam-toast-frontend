import { InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import TextField from "./@shared/TextField";

function SearchInput() {
  return (
    <TextField
      label="Search..."
      helperText="Please enter your repository name."
      sx={{
        m: 1,
        width: "75%",
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchInput;
