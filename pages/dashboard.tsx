import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import CreateButton from "../components/ButtonCreate";
import Content from "../components/Content";
import NavBar from "../components/Navbar";
import SearchInput from "../components/SearchInput";

const dashboard = () => {
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
          <CreateButton />
        </Box>
        <Content />
      </Container>
    </>
  );
};

export default dashboard;
