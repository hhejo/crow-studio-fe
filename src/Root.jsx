import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { setCurrentUser } from "./redux/user-slice";

const Root = () => {
  const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.user.value);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // 유저가 로그인되어 있지 않으면 종료
      console.log("flag:", flag);
      if (!user) return;
      // 현재 로그인한 user의 정보를 firestore의 users 컬렉션에서 가져오는 함수
      async function fetchUser() {
        // users 컬렉션에서 현재 로그인한 유저의 uid와 일치하는 유저 정보 가져오기
        const collectionRef = collection(firestore, "users");
        const q = query(collectionRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        // 2개 이상이면 에러
        if (querySnapshot.size > 1) {
          console.error("Multiple documents with the same uid.");
          return;
          // 0개 이면 유저가 없어 에러
        } else if (querySnapshot.size === 0) {
          console.log("유저를 찾을 수 없습니다");
          return;
        }
        // docId 가져오기
        const docId = querySnapshot.docs[0].id;
        // Redux에 로그인한 유저 정보 적용하기
        dispatch(setCurrentUser({ ...user, docId })).then(() => setFlag(true));
      }
      // fetchUser 실행
      fetchUser();
    });
    return () => unsubscribe();
  }, [dispatch, flag]);

  return (
    <div className="flex flex-col h-full w-full">
      <Nav />
      {flag && <Outlet />}
    </div>
  );
};

export default Root;
