import { Alert, AlertTitle } from "@mui/material";

export function ModalDeleteAlert() {
  return (
    <Alert severity="success">
      <AlertTitle>Success - Jaam Toast</AlertTitle>A Deployment is successfully
      deleted — <strong>we will wait for your next deployment!</strong>
    </Alert>
  );
}

export default ModalAlert;
