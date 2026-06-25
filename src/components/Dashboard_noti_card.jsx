import { useNavigate } from "react-router-dom";

import friendReqIcon from "../assets/friend_req_icon.svg";
import invitationIcon from "../assets/invitation_icon.svg";
import matchAcceptedIcon from "../assets/match_accepted_icon.svg";
import { formatNotificationTime } from "../utils/formatNotificationTime";

import "./Dashboard_noti_card.css";

const FRIEND_TYPES = new Set([
    "FRIEND_REQUEST",
    "FRIEND_REQUEST_ACCEPTED",
    "FRIEND_REQUEST_DECLINED",
]);

const getCardType = (type) => {
    if (type === "FRIEND_REQUEST" || type === "FRIEND_REQUEST_DECLINED") {
        return "fri_req_noti";
    }

    if (type === "INVITATION_RECEIVED" || type === "GAME_CANCELLED") {
        return "invitation_noti";
    }

    return "match_accepted_noti";
};

const getIcon = (type) => {
    const cardType = getCardType(type);

    if (cardType === "fri_req_noti") {
        return friendReqIcon;
    }

    if (cardType === "invitation_noti") {
        return invitationIcon;
    }

    return matchAcceptedIcon;
};

const getRedirectPath = (notification) => {
    if (notification.gameId) {
        return `/dashboard/games/${notification.gameId}`;
    }

    if (FRIEND_TYPES.has(notification.type)) {
        return "/dashboard/friends";
    }

    return "/dashboard/notifications";
};

const DashboardNotiCard = ({ notification }) => {
    const navigate = useNavigate();
    const cardType = getCardType(notification.type);
    const icon = getIcon(notification.type);

    const handleClick = () => {
        navigate(getRedirectPath(notification));
    };

    return (
        <div
            className={`noti_card ${cardType} ${
                notification.isRead ? "" : "noti_card_unread"
            }`}
            onClick={handleClick}
        >
            <div className={`noti_card_img_wrapper ${cardType}_img_wrapper`}>
                <img src={icon} alt="" />
            </div>

            <div className="noti_card_details">
                <div className="noti_title_time_wrapper">
                    <p className="noti_title">{notification.title}</p>
                    <p className="noti_time">
                        {formatNotificationTime(notification.createdAt)}
                    </p>
                </div>

                <p className="noti_message">{notification.message}</p>
            </div>
        </div>
    );
};

export default DashboardNotiCard;
