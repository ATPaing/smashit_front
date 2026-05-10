// lib
import { Outlet } from "react-router-dom";

// components
import SidebarNavLinkEl from "../components/SidebarNavLinkEl";

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
import profileIcon from "../assets/profile.svg";
import profileIconActive from "../assets/profile_active.svg";
import settingsIcon from "../assets/settings.svg";
import settingsIconActive from "../assets/settings_active.svg";

const DashboardMain = () => {
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
                        )}

                        {SidebarNavLinkEl(
                            "/dashboard/friends",
                            friendsIcon,
                            friendsIconActive,
                            "Friends",
                        )}

                        {SidebarNavLinkEl(
                            "/dashboard/profile",
                            profileIcon,
                            profileIconActive,
                            "Profile",
                        )}

                        {SidebarNavLinkEl(
                            "/dashboard/settings",
                            settingsIcon,
                            settingsIconActive,
                            "Settings",
                        )}
                    </ul>
                </nav>
            </aside>

            <main className="dashboard_content">
                <Outlet />
            </main>
        </div>
    );
};
export default DashboardMain;
