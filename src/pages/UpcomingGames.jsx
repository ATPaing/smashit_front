import { useState } from "react";

import UpcomingGameCard from "../components/UpcomingGameCard";
import EditGameModal from "../components/EditGameModal";
import RsvpModal from "../components/RsvpModal";

import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";

import "./UpcomingGames.css";

const UpcomingGames = () => {
    const { user, token } = useAuth();
    const { games, setGames, isLoadingGames } = useGamesContext();

    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedRsvpGame, setSelectedRsvpGame] = useState(null);

    const upcomingGames = games
        .filter((game) => new Date(game.startTime) > new Date())
        .map((game) => {
            const myInvitation = game.invitation?.find(
                (invite) => invite.userId === user?.id,
            );

            return {
                id: game.id,
                title: game.name,
                startDateTime: game.startTime,
                endDateTime: game.endTime,
                location: game.location,
                hostName: game.host?.name,
                role: game.hostId === user?.id ? "host" : "guest",
                rsvpStatus: myInvitation?.status?.toLowerCase() || null,
                minReliabilityScore: game.minReliabilityScore,
                playersJoined:
                    game.invitation?.filter(
                        (invite) => invite.status === "ACCEPTED",
                    ).length || 0,
            };
        });

    const handleSaveGame = async (updatedGame) => {
        try {
            const res = await fetch(
                `http://localhost:3000/game/${updatedGame.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: updatedGame.title,
                        location: updatedGame.location,
                        startTime: updatedGame.startDateTime,
                        endTime: updatedGame.endDateTime,
                        minReliabilityScore: updatedGame.minReliabilityScore,
                    }),
                },
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to update game");
                return;
            }

            setGames((prevGames) =>
                prevGames.map((game) =>
                    game.id === data.game.id ? data.game : game,
                ),
            );

            setSelectedGame(null);
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };
    const handleRsvpSubmit = ({ gameId, rsvpStatus }) => {
        setGames((prevGames) =>
            prevGames.map((game) =>
                game.id === gameId
                    ? {
                          ...game,
                          rsvpStatus,
                      }
                    : game,
            ),
        );

        setSelectedRsvpGame(null);
    };

    if (isLoadingGames) {
        return (
            <div className="upcomingGamesPage_outlet">
                <p>Loading games...</p>
            </div>
        );
    }

    return (
        <div className="upcomingGamesPage_outlet">
            <div className="upcomingGames_header">
                <h2>Upcoming Games</h2>
                <p>
                    Stay on top of your scheduled matches, manage your sessions,
                    and prepare for your upcoming games.
                </p>
            </div>

            {upcomingGames.map((game) => (
                <UpcomingGameCard
                    key={game.id}
                    game={game}
                    onEdit={() => setSelectedGame(game)}
                    onRespond={() => setSelectedRsvpGame(game)}
                />
            ))}

            {selectedGame && (
                <EditGameModal
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                    onSave={handleSaveGame}
                />
            )}

            {selectedRsvpGame && (
                <RsvpModal
                    game={selectedRsvpGame}
                    currentStatus={selectedRsvpGame.rsvpStatus}
                    onClose={() => setSelectedRsvpGame(null)}
                    onSubmit={handleRsvpSubmit}
                />
            )}
        </div>
    );
};

export default UpcomingGames;
