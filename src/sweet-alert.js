// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Sweet Alert 기본 옵션
export const swalOptions = {
  showCancelButton: true, // 취소 버튼 보이기
  confirmButtonText: "네", // 확인 버튼 내용
  cancelButtonText: "아니오", // 취소 버튼 내용
  background: "#3C3C3C", // 배경 색깔
};

// Sweet Alert
export const MySwal = withReactContent(Swal);
