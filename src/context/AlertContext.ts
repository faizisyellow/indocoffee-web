import { createContext } from "react";

export type AlertType = "success" | "error" | "warning";

export interface AlertContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);
