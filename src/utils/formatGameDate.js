export const formatPastGameDate = (isoString) => {
    const date = new Date(isoString);

    return {
        month: date.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
        day: date.getDate(),
        time: date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
    };
};

export const formatGameDate = (startISO, endISO) => {
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    return {
        month: startDate
            .toLocaleString("en-US", {
                month: "short",
            })
            .toUpperCase(),

        day: startDate.getDate(),

        formattedDate: startDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        }),

        startTime: startDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }),

        endTime: endDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }),
    };
};