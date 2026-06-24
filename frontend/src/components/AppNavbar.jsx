import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitial = (user?.name || user?.username || user?.email || "U")
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <nav className="navbar navbar-expand-lg crm-navbar sticky-top">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold" to="/profile">
            <span className="brand-mark">R</span>
            <span>
              Retail CRM Portal
              <small>Customer Profile Management System</small>
            </span>
          </Link>
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="user-info-top d-none d-md-flex align-items-center gap-2">
              <div className="user-avatar-small">{userInitial}</div>
              <div>
                <div className="user-name">{user?.name || user?.username || "User"}</div>
                <div className="user-email">{user?.email || "No email"}</div>
              </div>
            </div>
            <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <aside className="app-sidebar">
        <NavLink to="/profile" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <span>MP</span>
          My Profile
        </NavLink>
        <NavLink to="/profile/edit" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <span>ED</span>
          Edit Profile
        </NavLink>
      </aside>
    </>
  );
}
