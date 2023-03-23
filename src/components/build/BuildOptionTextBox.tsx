import { ChangeEvent, useState } from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";

import { Form, TextField } from "../@shared";
import useDeployEventHandler from "src/hooks/useDeployEventHandler";

import type { EventHandlerName } from "types/projectOption";

interface BuildOptionTextBoxProps {
  title: string;
  type: EventHandlerName;
  placeholder?: string;
  sx?: SxProps<Theme> | undefined;
}

function BuildOptionTextBox({
  title,
  type,
  placeholder,
  sx,
}: BuildOptionTextBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const eventHandler = useDeployEventHandler(type) as (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (eventHandler) eventHandler(e);

    setInputValue(e.target.value);
  };

  return (
    <Box sx={{ width: "50%", ...sx }}>
      <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Box sx={{ marginTop: 1.5 }}>
        <Form>
          <TextField
            value={inputValue}
            onChange={handleChange}
            size="small"
            sx={{ fontSize: "small" }}
            placeholder={placeholder}
          />
        </Form>
      </Box>
    </Box>
  );
}

export default BuildOptionTextBox;
