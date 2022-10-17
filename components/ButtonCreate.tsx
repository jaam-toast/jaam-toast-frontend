import Button from "@mui/material/Button";

const buttonCreate = () => {
  return (
    <Button
      variant="contained"
      sx={{
        m: 1,
        bgcolor: "#000",
        ":hover": {
          bgcolor: "#FFF",
          color: "#000",
        },
      }}
    >
      New Project
    </Button>
  );
};

export default buttonCreate;
