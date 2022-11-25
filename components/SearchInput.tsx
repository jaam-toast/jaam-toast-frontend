import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function SearchInput() {
  return (
    <TextField
      id="outlined-basic"
      label="Search..."
      variant="outlined"
      autoComplete="off"
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
