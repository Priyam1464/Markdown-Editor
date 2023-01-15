import { TextField, Box } from "@mui/material";

export default function Markdown({ onDataChange, markdownData }) {
  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        fullWidth
        id="outlined-textarea"
        multiline
        value={markdownData}
        InputProps={{ disableUnderline: true }}
        variant="standard"
        onChange={(e) => onDataChange(e.target.value)}
      />
    </Box>
  );
}
