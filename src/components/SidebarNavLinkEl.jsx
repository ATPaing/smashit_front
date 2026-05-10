// lib
import { NavLink } from "react-router-dom";

const SidebarNavLinkEl = (dirLink, icon, activeIcon, label) => {
    return (
        <li>
            <NavLink
                to={dirLink}
                replace
                end
                className={({ isActive }) =>
                    `sidebar_link ${isActive ? "active_link" : ""}`
                }
            >
                {({ isActive }) => (
                    <>
                        <img src={isActive ? activeIcon : icon} alt="" />
                        <span>{label}</span>
                    </>
                )}
            </NavLink>
        </li>
    );
};

export default SidebarNavLinkEl;
