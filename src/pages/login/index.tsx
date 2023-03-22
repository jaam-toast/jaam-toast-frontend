import { useRouter } from "next/router";
import { Box, Container, Divider, Typography } from "@mui/material";

import ButtonLogin from "src/components/ButtonLogin";
import useAuth from "src/hooks/useAuth";

function Login() {
  const router = useRouter();
  const authCode: string | string[] | undefined = router.query.code;

  useAuth(authCode);

  return (
    <Container maxWidth={false} disableGutters>
      <Divider />
      <Box
        component="div"
        display="flex"
        sx={{
          padding: 15,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Login to Jaam Toast
        </Typography>
        <Box sx={{ padding: 5 }}>
          <ButtonLogin />
          <Divider sx={{ padding: 1 }} />
        </Box>
      </Box>
      <Divider sx={{ marginTop: 20 }} />
    </Container>
  );
}

export default Login;
