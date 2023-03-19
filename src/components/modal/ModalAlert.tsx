import { Alert, AlertTitle } from "@mui/material";

export function ModalDeleteAlert() {
  return (
    <Alert severity="success">
      <AlertTitle>Success - Jaam Toast</AlertTitle>A Deployment is successfully
      deleted — <strong>we will wait for your next deployment!</strong>
    </Alert>
  );
}

export function ModalCreateAlert() {
  return (
    <Alert severity="success">
      <AlertTitle>Success - Jaam Toast</AlertTitle>A New Deployment is
      successfully created —{" "}
      <strong>Congratulation for your new deployment!</strong>
    </Alert>
  );
}
