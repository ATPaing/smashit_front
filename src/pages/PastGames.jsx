import { useState } from "react";

import MarkAttendanceModal from "../components/MarkAttendanceModal";
import PastGameCard from "../components/PastGameCard";

import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";

import "./PastGames.css";

const PastGames = () => {
    const { user } = useAuth();
    const { games, isLoadingGames } = useGamesContext();

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const pastGames = games
        .filter((game) => new Date(game.endTime) < new Date())
        .sort(
            (a, b) =>
                new Date(b.endTime).getTime() -
                new Date(a.endTime).getTime(),
        )
        .map((game) => {
            const players =
                game.invitation?.map((invite) => ({
                    id: invite.user?.id || invite.userId,
                    name: invite.user?.name || "Unknown player",
                    attendanceStatus:
                        invite.attendanceStatus?.toLowerCase() || "",
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
            };
        });

    const handleSaveAttendance = (data) => {
        console.log(data);
        setSelectedGame(null);
    };

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        setTimeout(() => {
            console.log("Load more games here");
            setIsLoadingMore(false);
        }, 1000);
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
                    <span>Showing last {pastGames.length} games</span>
                </div>

                <div className="past_games_list">
                    {pastGames.map((game) => (
                        <PastGameCard
                            key={game.id}
                            game={game}
                            onMarkAttendance={() => setSelectedGame(game)}
                        />
                    ))}
                </div>

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
            </section>

            {selectedGame && (
                <MarkAttendanceModal
                    gameId={selectedGame.id}
                    players={selectedGame.players}
                    onClose={() => setSelectedGame(null)}
                    onSubmit={handleSaveAttendance}
                />
            )}
        </main>
    );
};

export default PastGames;