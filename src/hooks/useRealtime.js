import { useContext, useEffect } from "react";

import { RealtimeContext } from "../context/realtimeContext.js";

export const useRealtime = () => {
    const context = useContext(RealtimeContext);

    if (!context) {
        throw new Error("useRealtime must be used within RealtimeProvider");
    }

    return context;
};

export const useOnNotification = (callback) => {
    const { subscribeNotifications } = useRealtime();

    useEffect(() => {
        return subscribeNotifications(callback);
    }, [callback, subscribeNotifications]);
};

export const useOnGamesChanged = (callback) => {
    const { subscribeGamesChanged } = useRealtime();

    useEffect(() => {
        return subscribeGamesChanged(callback);
    }, [callback, subscribeGamesChanged]);
};
