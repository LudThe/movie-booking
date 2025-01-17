import { Routes, Route } from "react-router"
import Header from "./components/Header/Header"
import BookingPage from "./pages/BookingPage/BookingPage"
import AdminPage from "./pages/AdminPage/AdminPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"

export default function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/success/:messageId" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}


