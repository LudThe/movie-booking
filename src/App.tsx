import { Routes, Route } from "react-router"
import Header from "./components/Header/Header"
import BookingPage from "./pages/BookingPage/BookingPage"
import AdminPage from "./pages/AdminPage/AdminPage"

export default function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}


