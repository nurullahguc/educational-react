import { Routes, Route } from "react-router"
import { HomePage } from './pages/home-page/HomePage'
import './App.css'
import { NotFoundPage } from "./pages/error-pages/NotFoundPage"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { ToastContainer, toast, Bounce } from 'react-toastify'

window.toast = toast;
function App() {
  const notify = () => toast("Wow so easy!");
  notify();
  return (
    <>

      <Routes>
        <Route index element={<HomePage />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  )
}

export default App
