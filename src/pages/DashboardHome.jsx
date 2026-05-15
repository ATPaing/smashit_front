// libs
import { NavLink } from "react-router-dom";
import { useState } from "react";

// css
import "./DashboardHome.css";

// icons
import locationIcon from "../assets/location_icon.svg";
import reliabilityIcon from "../assets/reliability_icon.svg";
import gamesIcon from "../assets/games.svg";
import activityIcon from "../assets/activity_icon.svg";
import friendReqIcon from "../assets/friend_req_icon.svg";
import invitationIcon from "../assets/invitation_icon.svg";
import matchAcceptedIcon from "../assets/match_accepted_icon.svg";

// components
import DashboardNotiCard from "../components/Dashboard_noti_card";
import CreateGameModal from "../components/CreateGameModal";

const DashboardHome = () => {
    const gameId = "12345"; // This would typically come from props or state
    const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);
    return (
        <div className="dashboard_home_wrapper">
            <div className="dashboard_middle_section">
                <div className="upcoming_event_card">
                    <p className="event_category">UPCOMING MATCH</p>
                    <p className="event_title">Elite Double Championship</p>
                    <div className="event_location">
                        <img src={locationIcon} alt="Location" />
                        <p>Downtown Badminton Center, Court 4</p>
                    </div>
                    <div className="event_details">
                        <div className="event_info event_date">
                            <p className="event_label">Date & Time</p>
                            <p className="event_value">Oct 24, 06:30 PM</p>
                        </div>
                        <div className="event_info event_fees">
                            <p className="event_label">FEE TYPE</p>
                            <p className="event_value">Split</p>
                        </div>
                        <div className="event_info event_host">
                            <p className="event_label">HOST</p>
                            <p className="event_value">John Doe</p>
                        </div>
                        <div className="event_info event_min_reliability">
                            <p className="event_label">MIN RELIABILITY</p>
                            <p className="event_value">95+</p>
                        </div>
                    </div>
                    <div className="expand_details">
                        <NavLink to={`games/${gameId}`}>Expand Details</NavLink>
                    </div>
                </div>
                <div className="metrics_section">
                    <div className="metric_card games_played">
                        <div className="metric_icon">
                            <img src={gamesIcon} alt="Games Played" />
                        </div>
                        <div className="metric_details">
                            <p className="metric_label">TOTAL MATCHES</p>
                            <p className="metric_value">124</p>
                            <p className="metric_description">
                                Played this season
                            </p>
                        </div>
                    </div>
                    <div className="metric_card reliability">
                        <div className="metric_icon">
                            <img src={reliabilityIcon} alt="Reliability" />
                        </div>
                        <div className="metric_details">
                            <p className="metric_label">RELIABILITY SCORE</p>
                            <p className="metric_value">98%</p>
                            <p className="metric_description">
                                Based on attendance
                            </p>
                        </div>
                    </div>
                </div>
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
                        <DashboardNotiCard
                            type="fri_req_noti"
                            icon={friendReqIcon}
                            title="NEW FRIEND REQUEST"
                            time="3m ago"
                            message="PiCa wants to connect with you."
                            extra="View profile to accept or ignore."
                        />
                        <DashboardNotiCard
                            type="invitation_noti"
                            icon={invitationIcon}
                            title="INVITATION RECEIVED"
                            time="8m ago"
                            message="Arthur invited you to a match."
                            extra="at Horfield Court."
                            game_id="123"
                        />

                        <DashboardNotiCard
                            type="match_accepted_noti"
                            icon={matchAcceptedIcon}
                            title="MATCH ACCEPTED"
                            time="15m ago"
                            message="Your match request has been accepted."
                            extra="Get ready to play!"
                            game_id="13"
                        />
                    </div>
                </div>
                <div className="dashboard_create_new_game_wrapper" onClick={() => setIsCreateGameModalOpen(true)}>
                    <div className="dashboard_create_new_game_content">
                    <p className="dashboard_create_new_game_title">Create New Game.</p>
                    <p className="dashboard_create_new_game_description">Host a public or private session</p>
                    </div>
                </div>
            </div>
            {isCreateGameModalOpen && <CreateGameModal onClose={() => setIsCreateGameModalOpen(false)} />}
        </div>
    );
};

export default DashboardHome;
