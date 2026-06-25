import { useNavigate } from "react-router-dom";

import friendReqIcon from "../assets/friend_req_icon.svg";
import invitationIcon from "../assets/invitation_icon.svg";
import matchAcceptedIcon from "../assets/match_accepted_icon.svg";
import { formatNotificationTime } from "../utils/formatNotificationTime";

import "./NotificationListItem.css";

const FRIEND_TYPES = new Set([
    "FRIEND_REQUEST",
    "FRIEND_REQUEST_ACCEPTED",
    "FRIEND_REQUEST_DECLINED",
]);

const TYPE_LABELS = {
    FRIEND_REQUEST: "Friend request",
    FRIEND_REQUEST_ACCEPTED: "Friend request accepted",
    FRIEND_REQUEST_DECLINED: "Friend request declined",
    INVITATION_RECEIVED: "Invitation received",
    MATCH_ACCEPTED: "Match accepted",
    GAME_CANCELLED: "Game cancelled",
};

const getNotificationStyle = (type) => {
    if (type === "FRIEND_REQUEST" || type === "FRIEND_REQUEST_DECLINED") {
        return {
            cardClass: "notification_item_friend",
            iconWrapperClass: "notification_item_friend_icon",
            icon: friendReqIcon,
        };
    }

    if (type === "INVITATION_RECEIVED" || type === "GAME_CANCELLED") {
        return {
            cardClass: "notification_item_invitation",
            iconWrapperClass: "notification_item_invitation_icon",
            icon: invitationIcon,
        };
    }

    return {
        cardClass: "notification_item_match",
        iconWrapperClass: "notification_item_match_icon",
        icon: matchAcceptedIcon,
    };
};

const getNotificationLink = (notification) => {
    if (notification.gameId) {
        return `/dashboard/games/${notification.gameId}`;
    }

    if (FRIEND_TYPES.has(notification.type)) {
        return "/dashboard/friends";
    }

    return null;
};

const NotificationListItem = ({
    notification,
    onMarkRead,
    isMarking,
}) => {
    const navigate = useNavigate();
    const { cardClass, iconWrapperClass, icon } = getNotificationStyle(
        notification.type,
    );
    const link = getNotificationLink(notification);
    const typeLabel = TYPE_LABELS[notification.type] || notification.type;

    const handleCardClick = async () => {
        if (!notification.isRead) {
            await onMarkRead(notification.id, { silent: true });
        }

        if (link) {
            navigate(link);
        }
    };

    const handleMarkReadClick = async (event) => {
        event.stopPropagation();
        await onMarkRead(notification.id);
    };

    return (
        <div
            className={`notification_item ${cardClass} ${
                notification.isRead
                    ? "notification_item_read"
                    : "notification_item_unread"
            } ${link ? "notification_item_clickable" : ""}`}
            onClick={link || !notification.isRead ? handleCardClick : undefined}
            role={link || !notification.isRead ? "button" : undefined}
            tabIndex={link || !notification.isRead ? 0 : undefined}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick();
                }
            }}
        >
            <div
                className={`notification_item_icon_wrapper ${iconWrapperClass}`}
            >
                <img src={icon} alt="" />
            </div>

            <div className="notification_item_details">
                <div className="notification_item_header">
                    <p className="notification_item_title">
                        {notification.title}
                    </p>
                    <p className="notification_item_time">
                        {formatNotificationTime(notification.createdAt)}
                    </p>
                </div>

                <p className="notification_item_message">
                    {notification.message}
                </p>

                <div className="notification_item_footer">
                    <span className="notification_item_type">{typeLabel}</span>

                    {!notification.isRead && (
                        <button
                            type="button"
                            className="notification_item_mark_read_btn"
                            onClick={handleMarkReadClick}
                            disabled={isMarking}
                        >
                            {isMarking ? "Marking..." : "Mark read"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationListItem;
