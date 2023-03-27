import { Box } from "@mui/material";

import { GREY_CLEAR } from "src/theme/colors";

function BorderBox({ ...props }) {
  const { sx, ...otherProps } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: "10px",
        border: `1px solid ${GREY_CLEAR}`,
        margin: "3rem 0",
        ...sx,
      }}
      {...otherProps}
    >
      {props.children}
    </Box>
  );
}

export default BorderBox;
