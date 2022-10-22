import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useModal from "../lib/hooks/useModal";

function ButtonCreate() {
  const { showModal } = useModal();

  const handleClickModalCreate = () => {
    showModal({
      modalType: "ModalCreate",
    });
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
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
        onClick={handleClickModalCreate}
      >
        New Project
      </Button>
    </Box>
  );
}

export default ButtonCreate;
