import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonLogin from "../components/ButtonLogin";

const pageLanding = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        sx={{
          justifyContent: "center",
          verticalAlign: "middle",
          alignItems: "center",
          m: 1,
        }}
      >
        <ButtonLogin />
      </Box>
    </Container>
  );
};

export default pageLanding;
