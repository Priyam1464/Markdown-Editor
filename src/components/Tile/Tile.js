import { Stack } from "@mui/material";

export default function Tile({ title, children }) {
  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "#F5F5F5",
        padding: 1,
        height: { sm: "2%", xs: "1%" },
        justifyContent: "space-between",
      }}
    >
      {title}
      {children}
    </Stack>
  );
}
