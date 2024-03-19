// Router
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init();

  return (
    <>
      {/* 라우터 제공 */}
      <RouterProvider router={router} />

      {/* 토스트 제공 */}
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
