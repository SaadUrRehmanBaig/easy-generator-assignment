import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function SnackBarNotification(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.openNotification}
        onClose={props.closeSnackbar}
        key={"top" + "right"}
        autoHideDuration={2000}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={props.severity || "error"}
          onClose={props.closeSnackbar}
        >
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
