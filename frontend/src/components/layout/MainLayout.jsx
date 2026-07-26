import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function MainLayout() {
  return (
    <div className="app-shell">
      {/* Sidebar remains visible across all protected pages */}
      <Sidebar />

      <div className="content-shell">
        {/* Top navigation */}
        <TopNavbar />

        {/* Current page is rendered here */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;