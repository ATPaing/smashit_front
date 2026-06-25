export const formatNotificationTime = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();

    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );
    const dateStart = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );
    const dayDiff = Math.round((todayStart - dateStart) / 86400000);

    if (diffMinutes < 1) {
        return "Just now";
    }

    if (dayDiff === 0) {
        if (diffMinutes < 60) {
            return diffMinutes === 1
                ? "1 minute ago"
                : `${diffMinutes} minutes ago`;
        }

        return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }

    if (dayDiff === 1) {
        return "Yesterday";
    }

    if (dayDiff < 7) {
        return `${dayDiff} days ago`;
    }

    if (dayDiff < 30) {
        const weeks = Math.floor(dayDiff / 7);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }

    const months = Math.floor(dayDiff / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
};
