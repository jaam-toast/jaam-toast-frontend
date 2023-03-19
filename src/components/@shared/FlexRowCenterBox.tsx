import { Box } from "@mui/material";
import { ReactNode } from "react";

interface FlexRowCenterBoxProps {
  children: ReactNode;
}

function FlexRowCenterBox({ children }: FlexRowCenterBoxProps) {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default FlexRowCenterBox;
