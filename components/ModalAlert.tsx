import { Alert, AlertTitle } from "@mui/material";

function ModalAlert() {
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      Deployment is successfully deleted —{" "}
      <strong>we will wait for your next deployment!</strong>
    </Alert>
  );
}

export default ModalAlert;
