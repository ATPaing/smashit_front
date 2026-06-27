import { useCallback, useEffect, useRef, useState } from "react";

import { API_BASE } from "../config/api.js";
import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";
import { RealtimeContext } from "./realtimeContext.js";

const POLL_INTERVAL_MS = 15000;

const RealtimeProvider = ({ children }) => {
    const { token } = useAuth();
    const { refreshGames } = useGamesContext();

    const [unreadCount, setUnreadCount] = useState(0);

    const notificationListeners = useRef(new Set());
    const gamesChangedListeners = useRef(new Set());

    const subscribeNotifications = useCallback((listener) => {
        notificationListeners.current.add(listener);
        return () => notificationListeners.current.delete(listener);
    }, []);

    const subscribeGamesChanged = useCallback((listener) => {
        gamesChangedListeners.current.add(listener);
        return () => gamesChangedListeners.current.delete(listener);
    }, []);

    const notifyListeners = (listeners, payload) => {
        listeners.current.forEach((listener) => listener(payload));
    };

    const refreshUnreadCount = useCallback(async () => {
        if (!token) {
            setUnreadCount(0);
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE}/notification/unread-count`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const data = await response.json();

            if (response.ok) {
                setUnreadCount(data.count ?? 0);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    const syncLiveData = useCallback(async () => {
        await Promise.all([refreshUnreadCount(), refreshGames()]);
    }, [refreshUnreadCount, refreshGames]);

    const handleNotificationEvent = useCallback(
        (event) => {
            let payload = null;

            try {
                payload = JSON.parse(event.data);
            } catch {
                payload = null;
            }

            if (payload?.notification && !payload.notification.isRead) {
                setUnreadCount((count) => count + 1);
            }

            refreshUnreadCount();
            refreshGames();
            notifyListeners(notificationListeners, payload);
        },
        [refreshUnreadCount, refreshGames],
    );

    const handleGamesChanged = useCallback(() => {
        refreshGames();
        notifyListeners(gamesChangedListeners);
    }, [refreshGames]);

    useEffect(() => {
        if (!token) {
            setUnreadCount(0);
            return;
        }

        refreshUnreadCount();
    }, [token, refreshUnreadCount]);

    useEffect(() => {
        if (!token) return;

        const eventSource = new EventSource(
            `${API_BASE}/sse/events?token=${token}`,
        );

        eventSource.addEventListener("notification", handleNotificationEvent);
        eventSource.addEventListener("next-game-changed", handleGamesChanged);

        return () => {
            eventSource.close();
        };
    }, [token, handleNotificationEvent, handleGamesChanged]);

    useEffect(() => {
        if (!token) return;

        const intervalId = setInterval(() => {
            syncLiveData();
        }, POLL_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [token, syncLiveData]);

    return (
        <RealtimeContext.Provider
            value={{
                unreadCount,
                refreshUnreadCount,
                subscribeNotifications,
                subscribeGamesChanged,
            }}
        >
            {children}
        </RealtimeContext.Provider>
    );
};

export default RealtimeProvider;
