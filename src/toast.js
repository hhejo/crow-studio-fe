// Toast
import { toast } from "react-toastify";

/**
 * 토스트 알림창 표시
 *
 * 토스트 타입 (success, warning, error, info)
 * @param {string} alertType - 토스트 알림 타입
 * @param {string} msg - 표시할 메시지
 * @returns 토스트
 */
export const alertToast = (alertType, msg) => {
  if (alertType === "success") return toast.success(msg);
  else if (alertType === "warning") return toast.warning(msg);
  else if (alertType === "error") return toast.error(msg);
  else if (alertType === "info") return toast.info(msg);
};
