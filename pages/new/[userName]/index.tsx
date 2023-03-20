import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Container, Typography } from "@mui/material";

import {
  BorderBox,
  CenterBox,
  FlexRowCenterBox,
  SearchInput,
} from "src/components/@shared";
import BuildStepCards from "src/components/build/BuildStepCards";
import BuildOptionRepoList from "src/components/build/BuildOptionRepoList";
import BuildOptionSelectBox from "src/components/build/BuildOptionSelectBox";
import { TITLE } from "src/lib/constants/metadata";
import loginState from "src/lib/recoil/auth";
import { gitNamespaceList } from "src/lib/recoil/git";

import { LoginData } from "src/types/auth";
import { GitNamespace } from "src/types/projectOption";

function New() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const gitNamespaces = useRecoilValue<GitNamespace[]>(gitNamespaceList);
  const [isSSR, setIsSSR] = useState(true);

  const userId = data._id;

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
        {!isSSR && (
          <>
            <Box>
              <Typography id="modal-title" variant="h4" component="h3">
                Let's build something new.
              </Typography>
              <Typography id="modal-title" variant="body2" gutterBottom>
                To deploy a new Project, import an existing Git Repository and
                Enjoy!
              </Typography>
            </Box>
            <BuildStepCards />
            <CenterBox>
              <BorderBox sx={{ boxShadow: 24, p: 4 }}>
                <Box sx={{ width: "100%", maxWidth: 800 }}>
                  <Box
                    display="flex"
                    sx={{
                      flexDirection: "column",
                    }}
                  >
                    <FlexRowCenterBox>
                      <Typography id="modal-title" variant="h6" component="h3">
                        Import Git Repository
                      </Typography>
                    </FlexRowCenterBox>
                    <FlexRowCenterBox>
                      <Box sx={{ width: "48%" }}>
                        <Typography
                          id="modal-description"
                          variant="body2"
                          sx={{ mt: 2 }}
                        >
                          Spaces
                        </Typography>
                        <Box sx={{ marginTop: 1.5 }}>
                          <BuildOptionSelectBox
                            label="Select a Git Namespace"
                            userId={userId}
                            type="spaceChange"
                            datas={gitNamespaces}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          marginLeft: 1.5,
                          width: "48%",
                          height: "max-content",
                        }}
                      >
                        <Typography
                          id="modal-description"
                          variant="body2"
                          sx={{ mt: 2 }}
                        >
                          Repository
                        </Typography>
                        <Box sx={{ marginTop: 1.5 }}>
                          <SearchInput
                            placeholder="Search.."
                            size="small"
                            sx={{
                              display: "inline-block",
                              width: "100%",
                            }}
                          />
                        </Box>
                      </Box>
                    </FlexRowCenterBox>
                    <BuildOptionRepoList />
                  </Box>
                </Box>
              </BorderBox>
            </CenterBox>
          </>
        )}
      </Container>
    </>
  );
}

export default New;
