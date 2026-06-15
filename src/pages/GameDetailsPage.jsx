import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { toast } from "react-toastify";
import { formatGameDate } from "../utils/formatGameDate";

import InfoCard from "../components/gameDetails/InfoCard";
import HostCard from "../components/gameDetails/HostCard";
import InvitePlayers from "../components/gameDetails/InvitePlayers";
import PlayerAttendance from "../components/gameDetails/PlayerAttendance";
import MatchSummary from "../components/gameDetails/MatchSummary";

import "./GameDetailsPage.css";

const avatarColors = ["#047857", "#2563EB", "#7C3AED", "#BE185D", "#C2410C"];

const GameDetailsPage = () => {
    const { gameId } = useParams();
    const {token} = useAuth();

    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {

                const res = await fetch(
                    `http://localhost:3000/game/${gameId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await res.json();
                console.log("Fetched game data:", data);
                if (!res.ok) {
                    toast.error(data.message || "Failed to fetch game");
                    return;
                }

                setGame(data.game);
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    if (isLoading) {
        return <main className="game_details_page">Loading game...</main>;
    }

    if (!game) {
        return <main className="game_details_page">Game not found.</main>;
    }

    const isHost = game.currentUserRole === "HOST";

    const { formattedDate, startTime, endTime } = formatGameDate(
        game.startTime,
        game.endTime,
    );

    const handleInviteSuccess = (newInvitee) => {
        setGame((prev) => {
            const alreadyExists = prev.players.some(
                (player) => player.id === newInvitee.id,
            );

            if (alreadyExists) {
                toast.error("Player already invited.");
                return prev;
            }

            return {
                ...prev,
                players: [...prev.players, newInvitee],
            };
        });
    };

    return (
        <main className="game_details_page">
            <div className="breadcrumb">
                <Link to="/dashboard/games">Games</Link>

                <span>/</span>

                <span>{game.title}</span>

                <div className="breadcrumb_status">
                    <div
                        className={`breadcrumb_status_indicator ${game.status}`}
                    ></div>

                    <p>{game.status}</p>
                </div>
            </div>

            <section className="game_title_area">
                <div>
                    <span className={`game_status ${game.status}`}>
                        {game.status}
                    </span>

                    <span className="game_ref">Ref: {game.id}</span>
                </div>

                <h1>{game.title}</h1>
            </section>

            <section className="game_info_grid">
                <InfoCard
                    icon="📍"
                    label="Location"
                    title={game.location.name}
                    subtitle={game.location.court || "Court not specified"}
                />

                <InfoCard
                    icon="📅"
                    label="Date & Time"
                    title={formattedDate}
                    subtitle={`${startTime} - ${endTime}`}
                />

                <InfoCard icon="💳" label="Fee Type" title={game.feeType} />

                <InfoCard
                    icon="🛡️"
                    label="Min Reliability"
                    title={`${game.minReliability}`}
                    subtitle="Required Score"
                />

                <HostCard host={game.host} avatarColors={avatarColors} />
            </section>

            {isHost && <InvitePlayers onInviteSuccess={handleInviteSuccess} />}

            <section className="game_content_grid">
                <PlayerAttendance
                    players={game.players}
                    avatarColors={avatarColors}
                />

                <MatchSummary players={game.players} />
            </section>
        </main>
    );
};

export default GameDetailsPage;