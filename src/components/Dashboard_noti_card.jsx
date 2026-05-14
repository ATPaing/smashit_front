const DashboardNotiCard = ({ type, icon, title, time, message, extra }) => {
    return (
        <div className={`noti_card ${type}`}>
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