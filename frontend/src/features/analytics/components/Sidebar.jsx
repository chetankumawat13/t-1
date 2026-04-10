import { useAnalytics } from "../hooks/useAnalytics";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { user, streak } = useAnalytics();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard__sidebar">
      <div className="sidebar">

     
        <div className="sidebar__profile">
          <img
            src={
              user?.avatar ||
              "https://ik.imagekit.io/ad6av31ld/blank-profile-picture-973460_640.webp"
            }
            alt="profile"
            className="avatar"
          />

          <h3>{user?.name || "Loading..."}</h3>

          <p className="streak">🔥 {streak ?? 0} days</p>
        </div>

        
        <div className="sidebar__main">

          <button
            className={`nav-btn ${isActive("/") ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            className={`nav-btn ${isActive("/saves") ? "active" : ""}`}
            onClick={() => navigate("/saves")}
          >
            All Saves
          </button>

          <button
            className={`nav-btn ${isActive("/deleted") ? "active" : ""}`}
            onClick={() => navigate("/deleted")}
          >
            Recently Deleted
          </button>

          <button
            className={`nav-btn ${isActive("/archive") ? "active" : ""}`}
            onClick={() => navigate("/archive")}
          >
            Archive
          </button>

          <button
            className={`nav-btn ${isActive("/graph") ? "active" : ""}`} 
            onClick={() => navigate("/graph")}
          >
            Graph
          </button>

        </div>

     
     <div className="sidebar__logout">
  <button
    className="logout-btn"
    onClick={async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include" 
        });
      } catch (err) {
        console.log(err);
      }

      navigate("/login"); 
    }}
  >
    Logout
  </button>
</div>

      </div>
    </div>
  );
};

export default Sidebar;