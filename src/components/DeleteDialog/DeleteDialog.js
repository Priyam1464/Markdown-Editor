import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function DeleteDialog({ fileName, handleClose, onDelete }) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete this Document?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete the {`${fileName}`} document and its
          contents? This action cannot be reversed
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: theme.secondary.main,
            color: "#fff",
            width: "100%",
          }}
          onClick={() => {
            onDelete(fileName);
            handleClose();
          }}
        >
          Confirm and Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
