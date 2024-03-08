import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { setCurrentUser } from "./redux/user-slice";
import { router } from "./router";

function App() {
  const dispatch = useDispatch();
  AOS.init();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // 유저가 로그인되어 있지 않으면 종료
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
        dispatch(setCurrentUser({ ...user, docId }));
      }
      // fetchUser 실행
      fetchUser();
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        className="rounded-[10px] text-[16px]"
      />
    </>
  );
}

export default App;
