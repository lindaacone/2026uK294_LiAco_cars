import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import ObjectListPage from "./components/pages/ObjectListPage";
import ObjectDetailPage from "./components/pages/ObjectDetailPage";
import ObjectEditPage from "./components/pages/ObjectEditPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/objects" element={<ObjectListPage />} />
        <Route path="/objects/:id" element={<ObjectDetailPage />} />
        <Route path="/objects/:id/edit" element={<ObjectEditPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}