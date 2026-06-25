// libs
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

// css
import "./DashboardHome.css";

// icons
import activityIcon from "../assets/activity_icon.svg";

// components
import DashboardNotiCard from "../components/Dashboard_noti_card";
import CreateGameModal from "../components/CreateGameModal";
import UpcomingEventCard from "../components/UpcomingEventCard";
import DashMetrices from "../components/DashboardMetrices";
import { useAuth } from "../hooks/useAuth";

const API_BASE = "http://localhost:3000";
const ACTIVITY_LIMIT = 3;

const DashboardHome = () => {
    const { token } = useAuth();
    const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoadingActivity, setIsLoadingActivity] = useState(true);

    const loadActivity = useCallback(async () => {
        if (!token) {
            setNotifications([]);
            setIsLoadingActivity(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/notification`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load activity");
            }

            setNotifications((data.notifications || []).slice(0, ACTIVITY_LIMIT));
        } catch (err) {
            console.error(err);
            setNotifications([]);
        } finally {
            setIsLoadingActivity(false);
        }
    }, [token]);

    useEffect(() => {
        loadActivity();
    }, [loadActivity]);

    return (
        <div className="dashboard_home_wrapper">
            <div className="dashboard_middle_section">
                <UpcomingEventCard />
                <DashMetrices />
            </div>
            <div className="dashboard_right_section">
                <div className="dashboard_notification_section">
                    <div className="dashboard_notification_header">
                        <img src={activityIcon} alt="activity_icon" />
                        <p>Activity</p>
                        <NavLink
                            className="dashboard_noti_view_all_btn"
                            to="notifications"
                        >
                            View All
                        </NavLink>
                    </div>
                    <div className="noti_card_wrapper">
                        {isLoadingActivity ? (
                            <p className="dashboard_activity_loading">
                                Loading activity...
                            </p>
                        ) : notifications.length === 0 ? (
                            <p className="dashboard_activity_empty">
                                No recent activity.
                            </p>
                        ) : (
                            notifications.map((notification) => (
                                <DashboardNotiCard
                                    key={notification.id}
                                    notification={notification}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div
                    className="dashboard_create_new_game_wrapper"
                    onClick={() => setIsCreateGameModalOpen(true)}
                >
                    <div className="dashboard_create_new_game_content">
                        <p className="dashboard_create_new_game_title">
                            Create New Game.
                        </p>
                        <p className="dashboard_create_new_game_description">
                            Host a public or private session
                        </p>
                    </div>
                </div>
            </div>
            {isCreateGameModalOpen && (
                <CreateGameModal
                    onClose={() => setIsCreateGameModalOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardHome;
