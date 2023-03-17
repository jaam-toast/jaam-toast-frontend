import { ChangeEvent, useState } from "react";
import { Box } from "@mui/system";
import { StandardTextFieldProps } from "@mui/material";

import Form from "./Form";
import TextField from "./TextField";
import useDeployEventHandler from "../../lib/hooks/useDeployEventHandler";

import { EventHandlerName } from "../../types/projectOption";

interface Prop extends StandardTextFieldProps {
  userId?: string;
  type: EventHandlerType;
}

function FormTextBox({ userId, type, ...props }: Prop) {
  const [inputValue, setInputValue] = useState<string>("");
  const eventHandler = useDeployEventHandler(type, userId);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (eventHandler) eventHandler(e);

    setInputValue(e.target.value);
  };

  return (
    <Box>
      <Form>
        <TextField
          value={inputValue}
          onChange={handleChange}
          size="small"
          sx={{ fontSize: "small" }}
          {...props}
        />
      </Form>
    </Box>
  );
}

export default FormTextBox;
