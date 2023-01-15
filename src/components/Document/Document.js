import { Stack, IconButton, Typography, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import File from "../../icons/File.svg";
export default function Document({
  fileName,
  onFileNameChange = null,
  date = null,
  updateLatestDoc = null,
  toggleDrawer = null,
}) {
  console.log("ll", fileName);
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const getDateComponent = () => {
    if (date === null && matches) {
      return <Typography sx={{ color: "#7C8187" }}>Document Name</Typography>;
    }

    return (
      <Typography
        sx={{ color: "#7C8187" }}
        onClick={(event) => {
          if (date !== null) {
            toggleDrawer(event);

            updateLatestDoc(fileName);
          }
        }}
      >
        {date}
      </Typography>
    );
  };
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          alignItems: !matches && "center",
          mt: date !== null && 2,
          ml: date !== null ? 1 : 2,
        }}
      >
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <File />
        </IconButton>
        <Stack>
          {
            /* {matches && (
            <Typography
              sx={{ color: "#7C8187" }}
              onClick={(event) => {
                if (date !== null) {
                  toggleDrawer(event);
                }
                updateLatestDoc(fileName);
              }}
            >
              {date !== null ? date : "Document Name"}
            </Typography>
          )} */
            getDateComponent()
          }
          {date === null ? (
            <TextField
              id="standard-error-helper-text"
              value={fileName}
              variant="standard"
              onChange={(e) => {
                onFileNameChange(e.target.value);
              }}
              sx={{ input: { color: "white" } }}
              InputProps={{ disableUnderline: true }}
            />
          ) : (
            <Typography
              onClick={(event) => {
                updateLatestDoc(fileName);

                toggleDrawer(event);
              }}
              sx={{ color: "white" }}
            >
              {fileName}
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}
