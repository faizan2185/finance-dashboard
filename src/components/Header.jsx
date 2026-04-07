// src/components/Header.jsx
import { useStore } from "../store/useStore";

const Header = ({ toggleSidebar }) => {
  const { role, toggleRole } = useStore();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h2>
          Finance <span>Dashboard</span>
        </h2>
      </div>

      <div className="header-right">
        <span className="role-badge">{role.toUpperCase()}</span>
        <button className="toggle-role-btn" onClick={toggleRole}>
          Switch to {role === "admin" ? "User" : "Admin"}
        </button>
      </div>
    </header>
  );
};

export default Header;