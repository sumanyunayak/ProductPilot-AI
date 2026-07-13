import React from "react";
import "./Sidebar.css";
import { Lightbulb,Bot,Map,FileText,CheckSquare, Settings,} from "lucide-react";
function Sidebar() {
  const menuItems = [
    { label: "Ideas", icon: <Lightbulb size={20} />, active: true },
    { label: "AI Analysis", icon: <Bot size={20} />, active: false },
    { label: "Roadmap", icon: <Map size={20} />, active: false },
    { label: "PRD Generator", icon: <FileText size={20} />, active: false },
    { label: "Tasks", icon: <CheckSquare size={20} />, active: false },
    { label: "Settings", icon: <Settings size={20} />, active: false },
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
              <button
                key={item.label} // It helps React understand which item changed, got added, or got removed.
                className={`sidebar-link ${item.active ? "active" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
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
