import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import useModal from "../lib/hooks/useModal";

function ModalDeploy() {
  const { showModal } = useModal();

  const handleClickModalCreate = () => {
    showModal({
      modalType: "ModalBuild",
    });
  };

  return (
    <Box sx={style}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#FFF",
          color: "#000",
          ":hover": {
            bgcolor: "#000",
            color: "#FFF",
          },
        }}
        onClick={handleClickModalCreate}
      >
        Prev
      </Button>
      <Box sx={{ width: "50%" }}>
        <Typography id="modal-title" variant="h6" component="h3" sx={{ mt: 2 }}>
          Deploy
        </Typography>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Building</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails sx={{ mt: 1 }}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ModalDeploy;
