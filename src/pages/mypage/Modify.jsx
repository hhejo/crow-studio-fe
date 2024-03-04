import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import userApi from "../../api/userApi";
import { logout, updateNickname, updateGitAuth } from "../../redux/userSlice";

import NicknameForm from "./components/NicknameForm";
import PasswordForm from "./components/PasswordForm";
import ResignForm from "./components/ResignForm";
import GitForm from "./components/GitForm";

const Modify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myNickname, myGitUsername } = useSelector(
    (state) => state.user.value
  );
  const MySwal = withReactContent(Swal);

  const updateNicknameHandler = (nicknameData) =>
    dispatch(updateNickname(nicknameData)).unwrap().catch(console.error);

  const submitPasswordHandler = (passwordData) => {
    userApi
      .updatePassword(passwordData)
      .then(toast.success("비밀번호를 성공적으로 변경했습니다"))
      .catch((errorStatusCode) => {
        console.log(errorStatusCode);
        if (errorStatusCode.response.status === 409) {
          toast.warning("현재 비밀번호가 틀립니다");
        } else {
          toast.error("Error");
        }
      });
  };

  const resignHandler = async () => {
    const res = await MySwal.fire({
      title: "정말로 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      background: "#3C3C3C",
    });
    if (!res.isConfirmed) {
      return;
    }
    try {
      await userApi.resign();
      toast.success("회원 탈퇴를 완료했습니다");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      if (err.response.status === 403) {
        toast.warning("팀장으로 있는 동안은 탈퇴할 수 없습니다");
      } else {
        toast.error("Error");
      }
    }
  };

  const updateGitAuthHandler = (credentialsData) => {
    dispatch(updateGitAuth(credentialsData))
      .unwrap()
      .then(() => toast.success("깃 연결 성공"))
      .catch(console.error);
  };

  return (
    <div
      className="lg:w-[700px] md:w-[400px] sm:w-[600px] w-[400px] p-8 flex flex-col border border-primary_-2_dark rounded-md overflow-auto"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div className="flex mb-5 justify-between items-center">
        <div className="text-white text-xl font-bold">회원정보 수정</div>
      </div>
      <NicknameForm
        updateNickname={updateNicknameHandler}
        initialNickname={myNickname}
      />
      <hr className="border-primary_-2_dark mb-5" />
      <PasswordForm updatePassword={submitPasswordHandler} />
      <hr className="border-primary_-2_dark mb-5" />
      <GitForm
        initialGitUsername={myGitUsername}
        updateGitAuth={updateGitAuthHandler}
      />
      <ResignForm resign={resignHandler} />
    </div>
  );
};

export default Modify;
