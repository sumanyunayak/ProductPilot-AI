import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import IdeasPage from "./pages/IdeasPage";
import IdeaDetailsPage from "./pages/IdeaDetailsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <IdeasPage />
            </MainLayout>
          }
        />

        <Route
          path="/ideas/:id"
          element={
            <MainLayout>
              <IdeaDetailsPage />
            </MainLayout>
          }
        />

        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
