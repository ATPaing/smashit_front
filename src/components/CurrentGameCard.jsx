import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

import calendarIcon from "../assets/calendar_icon.svg";
import locationIcon from "../assets/location_icon.svg";

import "./CurrentGameCard.css";

const CurrentGameCard = ({ game }) => {
    const navigate = useNavigate();

    const startDate = new Date(game.startDateTime);
    const endDate = new Date(game.endDateTime);

    const formattedDate = startDate.toLocaleDateString("en-GB", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    const formattedStartTime = startDate.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
    });

    const formattedEndTime = endDate.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
    });

    const visibleInvitees = game.invitees.slice(0, 3);
    const extraInvitees = game.invitees.length - visibleInvitees.length;

    return (
        <div
            className="currentGameCard"
            onClick={() => navigate(`/dashboard/games/${game.id}`)}
        >
            <div className="currentGameCard_content">
                <h3>{game.title}</h3>

                <div className="currentGame_time">
                    <img src={calendarIcon} alt="" />
                    <p>
                        {formattedDate} • {formattedStartTime} -{" "}
                        {formattedEndTime}
                    </p>
                </div>

                <div className="currentGame_location">
                    <img src={locationIcon} alt="" />
                    <p>{game.location}</p>
                </div>

                <div className="currentGame_divider"></div>

                <div className="currentGame_host">
                    <Avatar
                        name={game.hostName}
                        size="44"
                        round={true}
                        textSizeRatio={2}
                    />

                    <div>
                        <p className="hostName">{game.hostName}</p>
                        <p className="hostRole">HOST</p>
                    </div>
                </div>

                <div className="currentGame_invitees">
                    <div className="inviteeImages">
                        {visibleInvitees.map((invitee, index) => (
                            <div
                                key={invitee.id}
                                className="inviteeImage"
                                style={{
                                    marginLeft: index === 0 ? "0" : "-10px",
                                    zIndex: visibleInvitees.length - index,
                                }}
                                title={invitee.name}
                            >
                                <Avatar
                                    name={invitee.name}
                                    size="30"
                                    round={true}
                                    colors={[
                                        "#10B981",
                                        "#3B82F6",
                                        "#8B5CF6",
                                        "#EC4899",
                                        "#F97316",
                                    ]}
                                />
                            </div>
                        ))}

                        {extraInvitees > 0 && (
                            <div className="inviteeCount">+{extraInvitees}</div>
                        )}
                    </div>

                    <p>
                        {game.invitees.length}{" "}
                        {game.invitees.length === 1 ? "Invitee" : "Invitees"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrentGameCard;
