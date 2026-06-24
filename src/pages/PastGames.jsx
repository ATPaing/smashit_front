import { useState } from "react";
import { toast } from "react-toastify";

import MarkAttendanceModal from "../components/MarkAttendanceModal";
import PastGameCard from "../components/PastGameCard";

import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";
import { mapBackendAttendanceToFrontend } from "../utils/mapAttendanceStatus";

import "./PastGames.css";

const API_BASE = "http://localhost:3000";

const PastGames = () => {
    const { user, token } = useAuth();
    const { games, setGames, isLoadingGames } = useGamesContext();

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [isSavingAttendance, setIsSavingAttendance] = useState(false);

    const pastGames = games
        .filter(
            (game) => game.isCancelled || new Date(game.endTime) < new Date(),
        )
        .sort(
            (a, b) =>
                new Date(b.endTime).getTime() - new Date(a.endTime).getTime(),
        )
        .map((game) => {
            const players =
                game.invitation
                    ?.filter((invite) => invite.status === "ACCEPTED")
                    .map((invite) => ({
                        id: invite.user?.id || invite.userId,
                        name: invite.user?.name || "Unknown player",
                        attendanceStatus: mapBackendAttendanceToFrontend(
                            invite.attendanceStatus,
                        ),
                    })) || [];

            const attendanceStatus =
                players.length > 0 &&
                players.every((player) => player.attendanceStatus)
                    ? "recorded"
                    : "incomplete";

            return {
                id: game.id,
                role: game.hostId === user?.id ? "host" : "participant",
                title: game.name,
                location: game.location,
                startTime: game.startTime,
                endTime: game.endTime,
                players,
                attendanceStatus,
                isCancelled: game.isCancelled,
            };
        });

    const visiblePastGames = pastGames.slice(0, visibleCount);

    const hasMoreGames = visibleCount < pastGames.length;

    const handleSaveAttendance = async ({ gameId, attendance }) => {
        setIsSavingAttendance(true);

        try {
            const response = await fetch(
                `${API_BASE}/game/${gameId}/attendance`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ attendance }),
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save attendance");
            }

            setGames((prevGames) =>
                prevGames.map((game) => {
                    if (game.id !== gameId) return game;

                    return {
                        ...game,
                        invitation: game.invitation.map((invite) => {
                            const updatedInvite = data.invitations.find(
                                (item) => item.userId === invite.userId,
                            );

                            if (!updatedInvite) return invite;

                            return {
                                ...invite,
                                attendanceStatus:
                                    updatedInvite.attendanceStatus,
                                user: updatedInvite.user || invite.user,
                            };
                        }),
                    };
                }),
            );

            toast.success("Attendance saved successfully");
            setSelectedGame(null);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsSavingAttendance(false);
        }
    };

    const handleLoadMore = async () => {
        setIsLoadingMore(true);

        try {
            setVisibleCount((prev) => prev + 10);
        } finally {
            setIsLoadingMore(false);
        }
    };

    if (isLoadingGames) {
        return (
            <main className="past_games_page">
                <p>Loading past games...</p>
            </main>
        );
    }

    return (
        <main className="past_games_page">
            <section className="past_games_header">
                <div>
                    <h1>Past Games</h1>
                    <p>
                        Review your completed badminton matches, track stats,
                        and manage player attendance for hosted sessions.
                    </p>
                </div>
            </section>

            <section className="past_games_section">
                <div className="past_games_section_header">
                    <h2>Match History</h2>
                    <span>
                        Showing last {visiblePastGames.length} of{" "}
                        {pastGames.length} games
                    </span>
                </div>

                <div className="past_games_list">
                    {visiblePastGames.map((game) => (
                        <PastGameCard
                            key={game.id}
                            game={game}
                            onMarkAttendance={() => setSelectedGame(game)}
                        />
                    ))}
                </div>

                {hasMoreGames && (
                    <button
                        className="load_more_btn"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? (
                            <>
                                <span className="loading_spinner"></span>
                                Loading...
                            </>
                        ) : (
                            "Load More History"
                        )}
                    </button>
                )}
            </section>

            {selectedGame && (
                <MarkAttendanceModal
                    gameId={selectedGame.id}
                    players={selectedGame.players}
                    onClose={() => setSelectedGame(null)}
                    onSubmit={handleSaveAttendance}
                    isSubmitting={isSavingAttendance}
                />
            )}
        </main>
    );
};

export default PastGames;
