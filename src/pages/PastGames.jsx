import { useState } from "react";

import MarkAttendanceModal from "../components/MarkAttendanceModal";
import PastGameCard from "../components/PastGameCard";
import "./PastGames.css";

const pastGames = [
    {
        id: 1,
        role: "host",
        title: "Advanced Doubles Drill",
        location: "Downtown Badminton Club",
        startTime: "2026-10-24T18:30:00",
        endTime: "2026-10-24T20:00:00",
        players: ["Aung", "Myo", "Htet", "Ryan"],
        attendanceStatus: "incomplete",
    },
    {
        id: 2,
        role: "host",
        title: "Monday Night Singles Ladder",
        location: "East Side Sports Hall",
        startTime: "2026-10-21T19:00:00",
        endTime: "2026-10-21T21:00:00",
        players: ["Aung", "James"],
        attendanceStatus: "recorded",
    },
    {
        id: 3,
        role: "participant",
        title: "Weekend Warriors Open Play",
        location: "University Arena",
        startTime: "2026-10-18T20:30:00",
        endTime: "2026-10-18T22:00:00",
        players: ["Tom", "Alex", "Min", "Leo", "Sam", "Chris"],
    },
];

const PastGames = () => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const handleSaveAttendance = (gameId, attendancePayload) => {
        console.log(gameId);
        console.log(attendancePayload);

        // later:
        // PATCH /games/:gameId/attendance
        // body: { attendance: attendancePayload }
    };
    const handleLoadMore = () => {
        setIsLoadingMore(true);

        setTimeout(() => {
            console.log("Load more games here");
            setIsLoadingMore(false);
        }, 1000);
    };
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
                    <span>Showing last 20 games</span>
                </div>

                <div className="past_games_list">
                    {pastGames.map((game) => (
                        <PastGameCard
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
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                    onSave={handleSaveAttendance}
                />
            )}
        </main>
    );
};

export default PastGames;
