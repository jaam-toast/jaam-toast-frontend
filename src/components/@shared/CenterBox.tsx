import { Box } from "@mui/material";

function CenterBox({ ...props }) {
  const { sx, children, ...otherProps } = props;

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

export default CenterBox;
