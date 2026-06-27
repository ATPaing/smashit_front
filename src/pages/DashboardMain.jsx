// lib
import { Outlet, useNavigate } from "react-router-dom";

// components
import SidebarNavLinkEl from "../components/SidebarNavLinkEl";
import { useAuth } from "../hooks/useAuth";
import { useRealtime } from "../hooks/useRealtime";

// css
import "./DashboardMain.css";

// logo
import logo from "../assets/logo.svg";
import dashboardIcon from "../assets/dashboard.svg";
import dashboardIconActive from "../assets/dashboard_active.svg";
import gamesIcon from "../assets/games.svg";
import gamesIconActive from "../assets/games_active.svg";
import notiIcon from "../assets/noti.svg";
import notiIconActive from "../assets/noti_active.svg";
import friendsIcon from "../assets/friends.svg";
import friendsIconActive from "../assets/friends_active.svg";

const DashboardMain = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { unreadCount, refreshUnreadCount } = useRealtime();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard_main_wrapper">
            <aside className="sidebar">
                <div className="sidebar_header">
                    <img
                        src={logo}
                        alt="SmashIt Logo"
                        className="sidebar_logo"
                    />
                </div>
                <nav className="sidebar_nav">
                    <ul>
                        {SidebarNavLinkEl(
                            "/dashboard",
                            dashboardIcon,
                            dashboardIconActive,
                            "Dashboard",
                        )}

                        {SidebarNavLinkEl(
                            "/dashboard/games",
                            gamesIcon,
                            gamesIconActive,
                            "Games",
                        )}

                        {SidebarNavLinkEl(
                            "/dashboard/notifications",
                            notiIcon,
                            notiIconActive,
                            "Notifications",
                            unreadCount,
                        )}

                        {SidebarNavLinkEl(
                            "/dashboard/friends",
                            friendsIcon,
                            friendsIconActive,
                            "Friends",
                        )}
                    </ul>
                </nav>

                <button
                    type="button"
                    className="sidebar_logout_btn"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </aside>

            <main className="dashboard_content">
                <Outlet context={{ refreshUnreadCount }} />
            </main>
        </div>
    );
};
export default DashboardMain;
