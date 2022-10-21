import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonCreate from "../components/ButtonCreate";
import Content from "../components/Content";
import NavBar from "../components/Navbar";
import SearchInput from "../components/SearchInput";

function Dashboard() {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Box
          display="flex"
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            m: 1,
          }}
        >
          <SearchInput />
          <ButtonCreate />
        </Box>
        <Content />
      </Container>
    </>
  );
}

export default Dashboard;
