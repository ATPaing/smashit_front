import { NavLink } from "react-router-dom";
import locationIcon from "../assets/location_icon.svg";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const UpcomingEventCard = () => {
    const { token } = useAuth();

    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        let ignore = false;

        const fetchInitialGame = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/game/next",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                if (!ignore) {
                    setGameData(data.game);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchInitialGame();

        const eventSource = new EventSource(
            `http://localhost:3000/sse/events?token=${token}`,
        );

        eventSource.onopen = () => {
            console.log("SSE connected");
        };

        eventSource.onerror = (err) => {
            console.error("SSE error", err);
        };

        eventSource.addEventListener("next-game-changed", () => {
            fetchInitialGame();
        });

        return () => {
            ignore = true;
            eventSource.close();
        };
    }, [token]);

    if (loading) {
        return (
            <div className="upcoming_event_card">
                <p className="event_category">UPCOMING MATCH</p>
                <p>Loading upcoming match...</p>
            </div>
        );
    }

    if (!gameData) {
        return (
            <div className="upcoming_event_card">
                <p className="event_category">UPCOMING MATCH</p>
                <p>No upcoming match found.</p>
            </div>
        );
    }

    return (
        <div className="upcoming_event_card">
            <p className="event_category">UPCOMING MATCH</p>

            <p className="event_title">{gameData.name}</p>

            <div className="event_location">
                <img src={locationIcon} alt="Location" />
                <p>{gameData.location}</p>
            </div>

            <div className="event_details">
                <div className="event_info event_date">
                    <p className="event_label">Date & Time</p>

                    <p className="event_value">
                        {new Date(gameData.startTime).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                        })}
                    </p>
                </div>

                <div className="event_info event_fees">
                    <p className="event_label">FEE TYPE</p>

                    <p className="event_value">{gameData.feeType}</p>
                </div>

                <div className="event_info event_host">
                    <p className="event_label">HOST</p>

                    <p className="event_value">
                        {gameData.host?.name || "Unknown"}
                    </p>
                </div>

                <div className="event_info event_min_reliability">
                    <p className="event_label">MIN RELIABILITY</p>

                    <p className="event_value">
                        {gameData.minReliabilityScore}+
                    </p>
                </div>
            </div>

            <div className="expand_details">
                <NavLink to={`/dashboard/games/${gameData.id}`}>
                    Expand Details
                </NavLink>
            </div>
        </div>
    );
};

export default UpcomingEventCard;
