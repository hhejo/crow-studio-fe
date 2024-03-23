// Toast
import { toast } from "react-toastify";

/**
 * 토스트 알림창 표시
 * @param {string} toastType - 토스트 알림 타입 (info, success, warning, error)
 * @param {string} msg - 표시할 메시지
 * @returns 토스트
 */
export const alertToast = (toastType, msg) => {
  if (toastType === "success") return toast.success(msg);
  else if (toastType === "warning") return toast.warning(msg);
  else if (toastType === "error") return toast.error(msg);
  else if (toastType === "info") return toast.info(msg);
  return toast.error("TOAST ERROR !!");
};

export const toastType = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};
