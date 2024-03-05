const SignupTitle = () => {
  return (
    <section className="text-center pb-8 flex flex-col items-center">
      <img
        className="w-20 mb-3 rounded-full"
        src={require("../../assets/images/logo.png")}
        alt="logo-img"
      />
      <h1 className="text-4xl font-bold text-white pb-2 tracking-widest">
        회원가입
      </h1>
    </section>
  );
};

export default SignupTitle;
