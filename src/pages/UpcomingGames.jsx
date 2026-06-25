import { useState } from "react";
import { toast } from "react-toastify";

import UpcomingGameCard from "../components/UpcomingGameCard";
import EditGameModal from "../components/EditGameModal";
import RsvpModal from "../components/RsvpModal";
import ConfirmationModal from "../components/ConfirmationModal";

import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";
import {
    mapBackendStatusToRsvp,
    mapRsvpToBackendStatus,
} from "../utils/mapInvitationStatus";
import { API_BASE } from "../config/api.js";

import "./UpcomingGames.css";

const UpcomingGames = () => {
    const { user, token } = useAuth();
    const { games, setGames, isLoadingGames } = useGamesContext();

    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedRsvpGame, setSelectedRsvpGame] = useState(null);
    const [selectedCancelGame, setSelectedCancelGame] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);
    const [isUpdatingRsvp, setIsUpdatingRsvp] = useState(false);

    const upcomingGames = games
        .filter(
            (game) =>
                !game.isCancelled && new Date(game.startTime) > new Date(),
        )
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
                isCancelled: game.isCancelled,
                status: game.isCancelled ? "cancelled" : "upcoming",
            };
        });

    const handleCancelGame = async () => {
        if (!selectedCancelGame) return;

        setIsCancelling(true);

        try {
            const res = await fetch(
                `${API_BASE}/game/${selectedCancelGame.id}/cancel`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to cancel game");
                return;
            }

            setGames((prevGames) =>
                prevGames.map((game) =>
                    game.id === data.game.id ? data.game : game,
                ),
            );

            setSelectedCancelGame(null);
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setIsCancelling(false);
        }
    };

    const handleSaveGame = async (updatedGame) => {
        try {
            const res = await fetch(
                `${API_BASE}/game/${updatedGame.id}`,
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

    const handleRsvpSubmit = async ({ gameId, rsvpStatus }) => {
        setIsUpdatingRsvp(true);

        try {
            const status = mapRsvpToBackendStatus(rsvpStatus);

            const response = await fetch(
                `${API_BASE}/game/${gameId}/invitation/respond`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update RSVP");
            }

            setGames((prevGames) =>
                prevGames.map((game) => {
                    if (game.id !== gameId) return game;

                    return {
                        ...game,
                        invitation: game.invitation.map((invite) =>
                            invite.userId === user?.id
                                ? { ...invite, status: data.invitation.status }
                                : invite,
                        ),
                    };
                }),
            );

            toast.success("RSVP updated successfully");
            setSelectedRsvpGame(null);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsUpdatingRsvp(false);
        }
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
                    onCancel={() => setSelectedCancelGame(game)}
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
                    currentStatus={mapBackendStatusToRsvp(
                        selectedRsvpGame.rsvpStatus,
                    )}
                    onClose={() => setSelectedRsvpGame(null)}
                    onSubmit={handleRsvpSubmit}
                    isSubmitting={isUpdatingRsvp}
                />
            )}

            {selectedCancelGame && (
                <ConfirmationModal
                    title="Cancel game?"
                    message={`Are you sure you want to cancel "${selectedCancelGame.title}"? This action cannot be undone.`}
                    confirmText="Cancel Game"
                    cancelText="Keep Game"
                    variant="danger"
                    isLoading={isCancelling}
                    onConfirm={handleCancelGame}
                    onClose={() => setSelectedCancelGame(null)}
                />
            )}
        </div>
    );
};

export default UpcomingGames;
