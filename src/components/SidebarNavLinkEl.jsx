// lib
import { NavLink } from "react-router-dom";

const SidebarNavLinkEl = (
    dirLink,
    icon,
    activeIcon,
    label,
    badgeCount = 0,
) => {
    return (
        <li>
            <NavLink
                to={dirLink}
                end={dirLink === "/dashboard"}
                className={({ isActive }) =>
                    `sidebar_link ${isActive ? "active_link" : ""}`
                }
            >
                {({ isActive }) => (
                    <>
                        <img src={isActive ? activeIcon : icon} alt="" />
                        <span>{label}</span>
                        {badgeCount > 0 && (
                            <span className="sidebar_badge">
                                {badgeCount > 99 ? "99+" : badgeCount}
                            </span>
                        )}
                    </>
                )}
            </NavLink>
        </li>
    );
};

export default SidebarNavLinkEl;
