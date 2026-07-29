import React from "react";
import "./Sidebar.css";
import {
  Lightbulb,
  Bot,
  Map,
  FileText,
  CheckSquare,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const menuItems = [
    {
      label: "Ideas",
      icon: <Lightbulb size={20} />,
      path: "/ideas",
    },
    {
      label: "AI Analysis",
      icon: <Bot size={20} />,
      path: "/analysis",
    },
    {
      label: "Roadmap",
      icon: <Map size={20} />,
      path: "/roadmap",
    },
    {
      label: "PRD Generator",
      icon: <FileText size={20} />,
      path: "/prd",
    },
    {
      label: "Tasks",
      icon: <CheckSquare size={20} />,
      path: "/tasks",
    },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-icon">P</div>

          <div>
            <h1>ProductPilot</h1>
            <p>AI Product Manager Workspace</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(
            (
              item, // This loops through every item in the menuItems array and creates one sidebar button for each item.
            ) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ),
          )}
        </nav>
      </div>

      <div className="sidebar-footer">
        <p>Workspace</p>
        <strong>Personal Project</strong>
      </div>
    </aside>
  );
}

export default Sidebar;
