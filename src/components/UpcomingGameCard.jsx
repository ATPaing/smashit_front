import { useNavigate } from "react-router-dom";

import locationIcon from "../assets/location_icon.svg";
import clockIcon from "../assets/clock.svg";
import personIcon from "../assets/person_icon.svg";

const UpcomingGameCard = ({ game, onEdit }) => {
    const navigate = useNavigate();

    const isHost = game.role === "host";

    const startDate = new Date(game.startDateTime);
    const endDate = new Date(game.endDateTime);

    const month = startDate
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();

    const day = startDate.getDate();

    const startTime = startDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const endTime = endDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleCardClick = () => {
        navigate(`/dashboard/games/${game.id}`);
    };

    return (
        <div className="upcomingGame_card" onClick={handleCardClick}>
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
                    {isHost ? (
                        <span className="host_badge">HOST</span>
                    ) : (
                        <span className="guest_badge">
                            GUEST • {game.rsvpStatus.toUpperCase()}
                        </span>
                    )}

                    <span className="players_joined">
                        {game.playersJoined} PLAYERS JOINED
                    </span>
                </div>
            </div>

            <div className="upcomingGame_card_right">
                {isHost ? (
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
                                console.log("Cancel game");
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
                            console.log("Update RSVP");
                        }}
                    >
                        Update RSVP
                    </button>
                )}
            </div>
        </div>
    );
};

export default UpcomingGameCard;