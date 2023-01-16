import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Divider } from "@mui/material";
import Document from "../Document/Document";
import Trash from "../../icons/trash.svg";
import { useTheme } from "@mui/material/styles";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Save } from "@mui/icons-material";
import Logo from "../../icons/logo.svg";
import Cross from "../../icons/cross.svg";

export default function Header({
  isSaved,
  updateSaveStatus,
  fileName,
  onFileNameChange,
  onDelete,
  docExists,
  drawerOpen,
  toggleDrawer,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const greaterThantabletWidth = useMediaQuery("(min-width:768px)");
  const greaterThanDesktoptWidth = useMediaQuery("(min-width:1200px)");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <AppBar
        sx={{ backgroundColor: theme.pallete.primary.light }}
        position="relative"
      >
        <Toolbar>
          {!drawerOpen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={handleDrawerOpen}
              edge="start"
              onClick={(event) => {
                console.log("drawer event");
                toggleDrawer(event);
              }}
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {drawerOpen && greaterThantabletWidth && (
            <IconButton
              color="inherit"
              aria-label="close drawer"
              // onClick={handleDrawerOpen}
              edge="start"
              onClick={(event) => {
                console.log("drawer event");
                toggleDrawer(event);
              }}
              sx={{ mr: 2 }}
            >
              <Cross />
            </IconButton>
          )}

          {greaterThanDesktoptWidth && <Logo />}
          <Divider orientation="vertical"></Divider>

          <Document fileName={fileName} onFileNameChange={onFileNameChange} />
          <Stack sx={{ right: "2%", position: "absolute" }} direction="row">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: !docExists ? "none" : "visible" }}
              onClick={() => {
                handleClickOpen();
              }}
            >
              <Trash />
            </IconButton>
            <Button
              onClick={() => updateSaveStatus(true)}
              sx={{
                backgroundColor: theme.secondary.main,
                disabled: { isSaved },
                color: "#fff",
              }}
            >
              {matches === false ? (
                <Save />
              ) : isSaved ? (
                "Changes Saved"
              ) : (
                "Save Changes"
              )}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {open && (
        <DeleteDialog
          handleClose={handleClose}
          onDelete={onDelete}
          open={open}
          fileName={fileName}
        />
      )}
    </Box>
  );
}
