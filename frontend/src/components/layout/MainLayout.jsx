import React from "react";
import Sidebar from "./Sidebar"; // This imports the sidebar component from the same folder.
import TopNavbar from "./TopNavbar";

function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar /> {/* This renders the sidebar inside the layout. */}

      <div className="content-shell">
          <TopNavbar />
          <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;