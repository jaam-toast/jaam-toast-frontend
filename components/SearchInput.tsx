import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function SearchInput() {
  return (
    <TextField
      id="outlined-basic"
      label="Search..."
      variant="outlined"
      autoComplete="off"
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
