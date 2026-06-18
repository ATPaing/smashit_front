import { useNavigate } from "react-router-dom";

import locationIcon from "../assets/location_icon.svg";
import clockIcon from "../assets/clock.svg";
import personIcon from "../assets/person_icon.svg";

import { formatGameDate } from "../utils/formatGameDate";

const UpcomingGameCard = ({ game, onEdit, onRespond, onCancel }) => {
    const navigate = useNavigate();

    const isHost = game.role === "host";
    const isCancelled = game.isCancelled;

    const { month, day, startTime, endTime } = formatGameDate(
        game.startDateTime,
        game.endDateTime,
    );

    const handleCardClick = () => {
        if (isCancelled) return;

        navigate(`/dashboard/games/${game.id}`);
    };

    return (
        <div
            className={`upcomingGame_card ${
                isCancelled ? "upcomingGame_card_cancelled" : ""
            }`}
            onClick={handleCardClick}
        >
            <div className="upcomingGame_card_left">
                <p>{month}</p>
                <p>{day}</p>
            </div>

            <div className="upcomingGame_card_middle">
                <h3>{game.title}</h3>

                <div className="upcomingGame_card_middle_info">
                    <div className="game_info_item">
                        <img src={clockIcon} alt="Time" />

                        <p>
                            {startTime} - {endTime}
                        </p>
                    </div>

                    <div className="game_info_item">
                        <img src={locationIcon} alt="Location" />

                        <p>{game.location}</p>
                    </div>

                    {!isHost && (
                        <div className="game_info_item">
                            <img src={personIcon} alt="Host" />

                            <p>Host: {game.hostName}</p>
                        </div>
                    )}
                </div>

                <div className="upcomingGame_badges">
                    {isCancelled ? (
                        <span className="cancelled_badge">CANCELLED</span>
                    ) : isHost ? (
                        <span className="host_badge">HOST</span>
                    ) : (
                        <span className="guest_badge">
                            GUEST • {game.rsvpStatus?.toUpperCase()}
                        </span>
                    )}

                    <span className="players_joined">
                        {game.playersJoined} PLAYERS JOINED
                    </span>
                </div>
            </div>

            <div className="upcomingGame_card_right">
                {!isCancelled &&
                    (isHost ? (
                        <>
                            <button
                                className="edit_btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                            >
                                Edit
                            </button>

                            <button
                                className="cancel_btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCancel();
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="rsvp_btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRespond();
                            }}
                        >
                            Update RSVP
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default UpcomingGameCard;