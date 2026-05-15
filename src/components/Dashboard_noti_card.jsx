import { useNavigate } from "react-router-dom";

import "./Dashboard_noti_card.css";

const DashboardNotiCard = ({ type, icon, title, time, message, extra, game_id }) => {
    const navigate = useNavigate();

    const getRedirectPath = (type, game_id) => {
        console.log(type)
        switch (type) {
            case "fri_req_noti":
                return "/dashboard/friends";

            case "invitation_noti":
                return `/dashboard/games/${game_id}`;

            case "match_accepted_noti":
                return `/dashboard/games/${game_id}`;

            default:
                return "/dashboard";
        }
    };

    const handleClick = () => {
        const path = getRedirectPath(type, game_id);
        console.log(`Navigating to: ${path}`);
        navigate(path);
    };

    return (
        <div className={`noti_card ${type}`} onClick={handleClick}>
            <div className={`noti_card_img_wrapper ${type}_img_wrapper`}>
                <img src={icon} alt="" />
            </div>

            <div className="noti_card_details">
                <div className="noti_title_time_wrapper">
                    <p className="noti_title">{title}</p>
                    <p className="noti_time">{time}</p>
                </div>

                <p className="noti_message">{message}</p>
                <p className="noti_extra">{extra}</p>
            </div>
        </div>
    );
};

export default DashboardNotiCard;