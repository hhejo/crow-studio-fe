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
      if (!user) return;
      async function fetchUser() {
        const colRef = collection(firestore, "users");
        const q = query(colRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 1) {
          console.error("Multiple documents with the same uid.");
          return;
        } else if (querySnapshot.size === 0) {
          console.log("유저를 찾을 수 없습니다");
          return;
        }
        const docId = querySnapshot.docs[0].id;
        dispatch(setCurrentUser({ ...user, docId }));
      }
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
