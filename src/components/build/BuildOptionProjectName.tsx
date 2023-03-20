import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { Form, TextField } from "../@shared";
import useDebounce from "lib/hooks/useDebounce";
import useDeployEventHandler from "lib/hooks/useDeployEventHandler";
import getValidSubDomain from "lib/utils/getValidSubDomain";

function BuildOptionProjectName() {
  const router = useRouter();
  const { repo } = router.query;
  const [inputValue, setInputValue] = useState<string>("");
  const changeProjectName = useDeployEventHandler("projectNameChange") as (
    subDomain: string,
  ) => void;

  const onDebouncedSaveValidSubDomain = useDebounce(async value => {
    const validSubDomain = await getValidSubDomain(value || (repo as string));

    if (validSubDomain) {
      setInputValue(validSubDomain as string);
      changeProjectName(validSubDomain);
    } else {
      setInputValue(repo as string);
    }
  }, 1000);

  useEffect(() => {
    (async () => {
      const validSubDomain = await getValidSubDomain(repo as string);

      const subDomain = validSubDomain || repo as string;

      setInputValue(subDomain);
      changeProjectName(subDomain);
    })();
  }, []);

  const handleChangeProjectName = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(e.target.value);
    onDebouncedSaveValidSubDomain(e.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
        Project Name
      </Typography>
      <Box sx={{ marginTop: 1.5 }}>
        <Form>
          <TextField
            value={inputValue}
            onChange={handleChangeProjectName}
            size="small"
            sx={{ fontSize: "small" }}
            placeholder="`Project Name`"
          />
        </Form>
      </Box>
    </Box>
  );
}

export default BuildOptionProjectName;
