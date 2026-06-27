import { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import NotificationListItem from "../components/NotificationListItem";
import { useAuth } from "../hooks/useAuth";
import { API_BASE } from "../config/api.js";
import { useOnNotification } from "../hooks/useRealtime";

import "./NotificationsPage.css";

const NotificationsPage = () => {
    const { token } = useAuth();
    const { refreshUnreadCount } = useOutletContext() || {};

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMarkingAll, setIsMarkingAll] = useState(false);
    const [markingId, setMarkingId] = useState(null);

    const authHeaders = useMemo(
        () => ({
            Authorization: `Bearer ${token}`,
        }),
        [token],
    );

    const loadNotifications = useCallback(async () => {
        const response = await fetch(`${API_BASE}/notification`, {
            headers: authHeaders,
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load notifications");
        }

        setNotifications(data.notifications || []);
    }, [authHeaders]);

    useEffect(() => {
        const loadPage = async () => {
            setIsLoading(true);

            try {
                await loadNotifications();
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPage();
    }, [loadNotifications]);

    useOnNotification(loadNotifications);

    const unreadCount = useMemo(
        () => notifications.filter((notification) => !notification.isRead).length,
        [notifications],
    );

    const handleMarkRead = async (notificationId, options = {}) => {
        const { silent = false } = options;

        setMarkingId(notificationId);

        try {
            const response = await fetch(
                `${API_BASE}/notification/${notificationId}/read`,
                {
                    method: "PUT",
                    headers: authHeaders,
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to mark notification as read");
            }

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, isRead: true }
                        : notification,
                ),
            );

            if (refreshUnreadCount) {
                await refreshUnreadCount();
            }

            if (!silent) {
                toast.success("Notification marked as read");
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setMarkingId(null);
        }
    };

    const handleMarkAllRead = async () => {
        setIsMarkingAll(true);

        try {
            const response = await fetch(`${API_BASE}/notification/read-all`, {
                method: "PUT",
                headers: authHeaders,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to mark all notifications as read",
                );
            }

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    isRead: true,
                })),
            );

            if (refreshUnreadCount) {
                await refreshUnreadCount();
            }

            toast.success("All notifications marked as read");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsMarkingAll(false);
        }
    };

    if (isLoading) {
        return (
            <div className="notifications_page">
                <p className="notifications_page_loading">
                    Loading notifications...
                </p>
            </div>
        );
    }

    return (
        <div className="notifications_page">
            <div className="notifications_page_header">
                <div className="notifications_page_header_text">
                    <h1>Notifications</h1>
                    <p>Stay updated on friend requests and game invites</p>
                </div>

                <button
                    type="button"
                    className="notifications_mark_all_btn"
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0 || isMarkingAll}
                >
                    {isMarkingAll ? "Marking..." : "Mark all as read"}
                </button>
            </div>

            <section className="notifications_section_card">
                {notifications.length === 0 ? (
                    <p className="notifications_empty_state">
                        No notifications yet.
                    </p>
                ) : (
                    <div className="notifications_list">
                        {notifications.map((notification) => (
                            <NotificationListItem
                                key={notification.id}
                                notification={notification}
                                onMarkRead={handleMarkRead}
                                isMarking={markingId === notification.id}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default NotificationsPage;
