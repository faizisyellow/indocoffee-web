import { isAxiosError } from "axios";

const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: "Your request seems invalid. Please check and try again.",
  401: "You need to log in to continue.",
  403: "You don’t have permission to perform this action.",
  404: "We couldn’t find what you’re looking for.",
  408: "The request took too long. Please try again.",
  409: "This resource already exists.",
  429: "Too many requests.",
  500: "Something went wrong on our side. Please try again later.",
  502: "Server temporarily unavailable. Please try again.",
  503: "Service is currently under maintenance. Try again shortly.",
  504: "Server took too long to respond. Please try again later.",
};

export type StatusMessageMap = Record<number, string>;

export function prettyErrorServer(
  error: unknown,
  customMessages: StatusMessageMap = {},
): string {
  const messages = { ...DEFAULT_ERROR_MESSAGES, ...customMessages };
  const fallbackMessage = "Something went wrong. Please try again later.";

  if (!error) return fallbackMessage;

  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status && messages[status]) {
      return messages[status];
    }

    if (!error.response) {
      return "Unable to connect to the server. Please check your internet connection.";
    }

    return fallbackMessage;
  }

  if (error instanceof Error) {
    return fallbackMessage;
  }

  return fallbackMessage;
}
