import { useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext } from "../context/AlertContext";

type AlertType = "success" | "error" | "warning";

export function AlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  const showAlert = (msg: string, alertType: AlertType) => {
    setMessage(msg);
    setType(alertType);
    setOpen(true);
  };

  const success = (msg: string) => showAlert(msg, "success");
  const error = (msg: string) => showAlert(msg, "error");
  const warning = (msg: string) => showAlert(msg, "warning");

  const handleClose = () => setOpen(false);

  return (
    <AlertContext.Provider value={{ success, error, warning }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}
