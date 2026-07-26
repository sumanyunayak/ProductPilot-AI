import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import IdeasPage from "./pages/IdeasPage";
import IdeaDetailsPage from "./pages/IdeaDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="/ideas/:id" element={<IdeaDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;