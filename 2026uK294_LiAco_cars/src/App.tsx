import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import ObjectListPage from "./components/pages/ObjectListPage";
import ObjectDetailPage from "./components/pages/ObjectDetailPage";
import ObjectEditPage from "./components/pages/ObjectEditPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/login" element={ 
      <ProtectedRoute>
        <LoginPage />
    </ProtectedRoute>
  }
/>

        <Route path="/objects" element={ 
      <ProtectedRoute>
        <ObjectListPage />
    </ProtectedRoute>
  }
/>

<Route path="/objects/:id" element={
    <ProtectedRoute>
      <ObjectDetailPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/objects/:id/edit" element={
    <ProtectedRoute>
      <ObjectEditPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/objects/create" element={
    <ProtectedRoute>
      <ObjectEditPage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}