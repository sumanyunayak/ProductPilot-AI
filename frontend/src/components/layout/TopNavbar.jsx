// This component will sit above every page and show:
// current page title
// short page description
// search input
// action button
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bell, Home } from "lucide-react";
import "./TopNavbar.css";

function TopNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <header className="top-navbar">
      <div className="breadcrumb">
        <span className="breadcrumb-home">
          <Home size={16} />
          Home
        </span>

        <span className="breadcrumb-separator">/</span>

        <span className="breadcrumb-current">Product Ideas</span>
      </div>

      <div className="top-navbar-right">
        <input
          type="text"
          className="search-input"
          placeholder="Search ideas..."
        />

        <button className="notification-btn">
          <Bell size={18} />
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <div className="user-profile">
          <div className="avatar">S</div>

          <div className="user-info">
            <p className="user-name">Sumanyu</p>
            <span className="user-role">Product Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
