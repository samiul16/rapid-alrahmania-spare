import { toast, ToastPosition, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

const toastAlert = (
  type: ToastType,
  message: string,
  position: ToastPosition = "top-right",
  toastId?: React.MutableRefObject<string | number | null>,
  options?: ToastOptions
) => {
  const defaultOptions: ToastOptions = {
    position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  };

  // Dismiss previous toast if toastId exists
  if (toastId?.current) {
    toast.dismiss(toastId.current);
  }

  let newToastId: string | number;

  switch (type) {
    case "success":
      newToastId = toast.success(message, defaultOptions);
      break;
    case "error":
      newToastId = toast.error(message, defaultOptions);
      break;
    case "info":
      newToastId = toast.info(message, defaultOptions);
      break;
    case "warning":
      newToastId = toast.warning(message, defaultOptions);
      break;
    default:
      newToastId = toast(message, defaultOptions);
  }

  // Store the toast ID if ref is provided
  if (toastId) {
    toastId.current = newToastId;
  }

  return newToastId;
};

export default toastAlert;
