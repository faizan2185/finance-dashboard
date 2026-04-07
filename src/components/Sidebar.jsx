// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <NavLink to="/">
        <span className="sidebar-icon">📊</span>
        Dashboard
      </NavLink>
      <NavLink to="/transactions">
        <span className="sidebar-icon">💳</span>
        Transactions
      </NavLink>
      <NavLink to="/insights">
        <span className="sidebar-icon">📈</span>
        Insights
      </NavLink>
    </aside>
  );
};

export default Sidebar;