import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { logout } from "../redux/user-slice";

const MENU_ID = "nav-menu-id";

const Header = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { isLoggedIn, uid, nickname } = useSelector(
    (state) => state.user.value
  );
  const { show } = useContextMenu({ id: MENU_ID });
  const clickNicknameHandler = (e) => displayMenu(e);
  const logoutHandler = () => {
    dispatch(logout());
    toast.success("로그아웃 성공");
    navigate("/", { replace: true });
  };
  const displayMenu = (e) => {
    show({ event: e });
    return e;
  };

  return (
    <>
      {/* Context Menu */}
      <Menu id={MENU_ID} className="contexify-crow-nav">
        {isLoggedIn && (
          <>
            <Item onClick={() => navigate(`/teams`)}>나의 팀 목록</Item>
            <Item onClick={() => navigate(`/mypage/${uid}`)}>
              회원정보 수정
            </Item>
            <Item onClick={logoutHandler}>로그아웃</Item>
          </>
        )}
      </Menu>
      {/* Nav */}
      <nav className="flex flex-wrap items-center justify-center px-2 py-1 bg-component_item_bg_dark m-3 rounded-lg">
        <div className="w-full flex relative px-12 justify-between">
          {/* 로고, 아이콘 */}
          <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex items-center">
              <Link
                className="text-xl font-bold leading-relaxed inline-block mr-16 py-2 whitespace-nowrap uppercase text-white"
                to="/"
              >
                <div className="flex w-fit">
                  <img
                    className="w-8 rounded-full mr-2"
                    src={require("../assets/images/logo.png")}
                    alt="logo-img"
                  />
                  <span className="tracking-wide">까마귀공방</span>
                </div>
              </Link>
            </div>
          </div>
          {/* 프로필 */}
          <div className="flex item-center mt-2.5">
            <div className="cursor-pointer mt-[3px]">
              {/* 로그인 O */}
              {isLoggedIn && (
                <div
                  className="hover:text-white"
                  onClick={clickNicknameHandler}
                >
                  {nickname}
                </div>
              )}
              {/* 로그인 X */}
              {!isLoggedIn && (
                <div className="flex justify-end items-center">
                  <div
                    className="hover:text-white mr-4 transition"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </div>
                  <div
                    className="hover:text-white transition"
                    onClick={() => navigate("/signup")}
                  >
                    회원가입
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
