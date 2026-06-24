import { useState } from "react";
import { toast } from "react-toastify";

import InvitedGameCard from "../components/InvitedGameCard";

import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";

import "./InvitedGames.css";

const API_BASE = "http://localhost:3000";

const InvitedGames = () => {
    const { user, token } = useAuth();
    const { games, setGames, isLoadingGames } = useGamesContext();
    const [respondingGameId, setRespondingGameId] = useState(null);

    const invitedGames = games
        .filter(
            (game) =>
                game.hostId !== user?.id &&
                new Date(game.startTime) > new Date() &&
                game.invitation?.some((invite) => invite.userId === user?.id),
        )
        .map((game) => {
            const myInvitation = game.invitation?.find(
                (invite) => invite.userId === user?.id,
            );

            return {
                id: game.id,
                hostName: game.host?.name,
                title: game.name,
                startDateTime: game.startTime,
                endDateTime: game.endTime,
                location: game.location,
                feeType: game.feeType,
                rsvpStatus: myInvitation?.status || "PENDING",
            };
        });

    const updateInvitationStatus = (gameId, status) => {
        setGames((prevGames) =>
            prevGames.map((game) => {
                if (game.id !== gameId) return game;

                return {
                    ...game,
                    invitation: game.invitation.map((invite) =>
                        invite.userId === user?.id
                            ? { ...invite, status }
                            : invite,
                    ),
                };
            }),
        );
    };

    const respondToInvitation = async (gameId, status) => {
        setRespondingGameId(gameId);

        try {
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
                throw new Error(data.message || "Failed to update invitation");
            }

            updateInvitationStatus(gameId, data.invitation.status);

            toast.success(
                status === "ACCEPTED"
                    ? "Invitation accepted"
                    : "Invitation declined",
            );
        } catch (err) {
            toast.error(err.message);
        } finally {
            setRespondingGameId(null);
        }
    };

    const handleAccept = (gameId) => respondToInvitation(gameId, "ACCEPTED");
    const handleDecline = (gameId) => respondToInvitation(gameId, "DECLINED");

    if (isLoadingGames) {
        return (
            <div className="invitedGames">
                <p>Loading invited games...</p>
            </div>
        );
    }

    return (
        <div className="invitedGames">
            <div className="invitedGames_header">
                <h2>Invited Games</h2>
                <p>
                    You have been selected to join these upcoming matches.
                    Review the details and respond to secure your spot on the
                    court.
                </p>
            </div>

            {invitedGames.length === 0 ? (
                <p>No invited games found.</p>
            ) : (
                <div className="invitedGames_grid">
                    {invitedGames.map((game) => (
                        <InvitedGameCard
                            key={game.id}
                            game={game}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                            isResponding={respondingGameId === game.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InvitedGames;
