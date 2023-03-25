import { ChangeEvent, useState } from "react";
import {
  TextField as TextFieldMui,
  TextFieldProps as TextFieldMuiProps,
} from "@mui/material";

import useDebounce from "src/hooks/useDebounce";

type TextFieldProps = Partial<TextFieldMuiProps> & {
  delay?: number;
  defaultValue?: string;
  onTextFieldChange?: (text: string) => void;
};

function TextField({
  delay = 1000,
  defaultValue = "",
  onTextFieldChange = () => {},
  ...props
}: TextFieldProps) {
  const [text, setText] = useState<string>(defaultValue);

  const onTextFieldDebounceChange = useDebounce((text: string) => {
    onTextFieldChange(text);
  }, delay);

  const handleMuiTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
    onTextFieldDebounceChange(text);
  };

  return (
    <TextFieldMui
      id="outlined-basic"
      value={text}
      onChange={handleMuiTextFieldChange}
      variant="outlined"
      autoComplete="off"
      sx={{
        fontSize: "small",
      }}
      {...props}
    />
  );
}

export default TextField;
