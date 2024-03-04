import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import userApi from "../../api/userApi";
import { getUser } from "../../redux/userSlice";

import Header from "../../components/Header";
import SignupTitle from "./SignupTitle";
import SignupForm from "./SignupForm";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (signupData) => {
    try {
      const res = await userApi.signup(signupData);
      localStorage.setItem("access-token", `${res.data.jwt}`);
      dispatch(getUser());
      toast.success("회원가입 성공");
      navigate("/teams");
    } catch (err) {
      if (err.response.status === 409) {
        toast.warning("이미 해당 아이디가 존재합니다");
      } else {
        toast.error("Error");
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <section
        data-aos="fade-in"
        className="p-4 w-screen h-full flex flex-wrap justify-center items-center"
      >
        <div className="h-fit flex flex-col">
          <SignupTitle />
          <SignupForm signupHandler={signupHandler} />
          <Link
            to="/login"
            className="block w-full text-center hover:text-white transition"
          >
            계정이 있으신가요? 로그인하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;
