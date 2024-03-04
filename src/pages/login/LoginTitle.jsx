import React from "react";

const LoginTitle = () => {
  return (
    <section className="text-center pb-10 flex flex-col items-center">
      <img
        className="w-20 mb-3 rounded-full"
        src={require("../../assets/images/logo.png")}
        alt="logo-img"
      />
      <h1 className="text-4xl font-bold text-white pb-2 tracking-widest">
        로그인
      </h1>
      {/* <p className="text-xs">
        무언가 굉장하고 엄청난 웹IDE계의 이단아가 등장했다. 다들 사용해달라 지금
        당장!!
      </p> */}
    </section>
  );
};

export default LoginTitle;
