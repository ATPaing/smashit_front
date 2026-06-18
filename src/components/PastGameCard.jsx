import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

import { formatPastGameDate } from "../utils/formatGameDate";

import "./PastGameCard.css";

const avatarColors = ["#047857", "#2563EB", "#7C3AED", "#BE185D", "#C2410C"];

const PastGameCard = ({ game, onMarkAttendance }) => {
    const navigate = useNavigate();

    const date = formatPastGameDate(game.startTime);

    const handleViewDetails = (e) => {
        e.stopPropagation();

        navigate(`/dashboard/games/${game.id}`);
    };

    return (
        <article
            className={`past_game_card past_game_card_${game.role} ${
                game.isCancelled ? "past_game_card_cancelled" : ""
            }`}
            onClick={() => navigate(`/dashboard/games/${game.id}`)}
        >
            <div className="past_game_date">
                <span>{date.month}</span>

                <strong>{date.day}</strong>

                <small>{date.time}</small>
            </div>

            <div className="past_game_info">
                <div className="past_game_title_row">
                    <span className={`past_game_badge ${game.role}`}>
                        {game.role === "host" ? "HOST" : "PARTICIPANT"}
                    </span>

                    {game.isCancelled && (
                        <span className="past_game_badge cancelled">
                            CANCELLED
                        </span>
                    )}

                    <h3>{game.title}</h3>
                </div>

                <div className="past_game_meta">
                    <span>📍 {game.location}</span>

                    <span>👥 {game.players.length} Players</span>
                </div>

                <div className="past_game_avatars">
                    {game.players.slice(0, 4).map((player, index) => (
                        <Avatar
                            key={player.id}
                            name={player.name}
                            size="26"
                            round
                            textSizeRatio={2}
                            color={avatarColors[index % avatarColors.length]}
                        />
                    ))}

                    {game.players.length > 4 && (
                        <span className="extra_players">
                            +{game.players.length - 4}
                        </span>
                    )}
                </div>
            </div>

            <div className="past_game_action">
                {game.isCancelled && (
                    <button
                        className="view_details_btn"
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>
                )}
                {
                    !game.isCancelled &&
                    game.role === "host" &&
                    game.attendanceStatus === "incomplete" && (
                        <>
                            <span
                                className="view_details_text"
                                onClick={handleViewDetails}
                            >
                                View Details
                            </span>

                            <div className="attendance_status incomplete">
                                <p>Attendance Incomplete</p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkAttendance();
                                    }}
                                >
                                    Mark Attendance
                                </button>
                            </div>
                        </>
                    )}

                {
                    !game.isCancelled &&
                    game.role === "host" &&
                    game.attendanceStatus === "recorded" && (
                        <>
                            <span
                                className="view_details_text"
                                onClick={handleViewDetails}
                            >
                                View Details
                            </span>

                            <div className="attendance_status recorded">
                                <p>Attendance Recorded</p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkAttendance();
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </>
                    )}

                {game.role === "participant" && (
                    <button
                        className="view_details_btn"
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>
                )}
            </div>
        </article>
    );
};

export default PastGameCard;
