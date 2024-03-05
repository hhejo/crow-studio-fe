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
    </section>
  );
};

export default LoginTitle;
