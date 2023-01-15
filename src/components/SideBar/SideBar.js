import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Stack, Box } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import moment from "moment";
import Document from "../Document/Document";
import Logo from "../../icons/logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cross from "../../icons/Cross.svg";
import IconButton from "@mui/material/IconButton";

export default function SideBar({ drawerOpen, toggleDrawer, updateLatestDoc }) {
  const [documents, setDocuments] = useLocalStorage("documents");
  const matches = useMediaQuery("(min-width:768px)");
  const greaterThanDesktoptWidth = useMediaQuery("(min-width:1200px)");

  console.log("docs", documents);
  const theme = useTheme();
  return (
    <Drawer
      anchor={"left"}
      open={drawerOpen}
      onClose={(event) => {
        toggleDrawer(event);
      }}
      PaperProps={{
        sx: {
          width: matches ? "20%" : "100%",
          backgroundColor: theme.pallete.primary.light,
        },
      }}
      variant="persistent"
    >
      <Stack sx={{ width: "100%" }}>
        {!greaterThanDesktoptWidth && (
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Box sx={{ mt: 2, ml: 2 }}>
              <Logo />
            </Box>
            {!matches && (
              <IconButton
                color="inherit"
                aria-label="close drawer"
                // onClick={handleDrawerOpen}
                edge="start"
                onClick={(event) => {
                  console.log("drawer event");
                  toggleDrawer(event);
                }}
                sx={{ mr: 1 }}
              >
                <Cross />
              </IconButton>
            )}
          </Stack>
        )}
        <Typography sx={{ color: "#fff", marginTop: 4, marginLeft: 2 }}>
          My Documents
        </Typography>

        <Button
          sx={{
            backgroundColor: theme.secondary.main,
            color: "#fff",
            width: "75%",
            mt: 4,
            ml: 2,
          }}
          onClick={(event) => {
            updateLatestDoc(null);
            toggleDrawer(event);
          }}
        >
          New Document
        </Button>
        <Stack sx={{ ml: 2 }}>
          {documents != null &&
            Object.keys(documents).map((fileName) => {
              return (
                <Document
                  fileName={fileName}
                  updateLatestDoc={updateLatestDoc}
                  date={moment(fileName.date).format("MMM Do YY")}
                  toggleDrawer={toggleDrawer}
                />
              );
            })}
        </Stack>
      </Stack>
    </Drawer>
  );
}
