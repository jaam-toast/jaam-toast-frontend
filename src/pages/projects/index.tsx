import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Button } from "@mui/material";

import ProjectList from "src/components/ProjectList";
import { SearchInput } from "src/components/@shared";
import useUser from "src/hooks/useUser";

function UserProjects() {
  const { user } = useUser();
  const router = useRouter();
  const [searchword, setSearchword] = useState<string>("");

  const handleCreateProjectClick = () => {
    router.push(`/new/${user.name}`);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Container fixed maxWidth="lg" sx={{ height: "90vh" }}>
        {/* //TODO: make variant. */}
        <Box
          display="flex"
          sx={{
            padding: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <SearchInput
            onSearchInputChange={setSearchword}
            placeholder="Search..."
            helperText="Please enter your Project name."
            sx={{
              m: 1,
              width: "75%",
            }}
          />
          <Box sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              color="dark"
              sx={{ m: 1 }}
              onClick={handleCreateProjectClick}
            >
              New Project
            </Button>
          </Box>
        </Box>
        {/* // TODO: Skeleton UI */}
        <ProjectList searchword={searchword} />
      </Container>
    </Container>
  );
}

export default UserProjects;
