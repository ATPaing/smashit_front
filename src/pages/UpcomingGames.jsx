import { useState } from "react";

import UpcomingGameCard from "../components/UpcomingGameCard";
import EditGameModal from "../components/EditGameModal";
import RsvpModal from "../components/RsvpModal";

import "./UpcomingGames.css";

const UpcomingGames = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    const [selectedRsvpGame, setSelectedRsvpGame] = useState(null);

    const [games, setGames] = useState([
        {
            id: 1,
            title: "Friday Night Doubles",
            startDateTime: "2026-10-24T19:00:00",
            endDateTime: "2026-10-24T21:00:00",
            location: "City Sports Center",
            role: "host",
            playersJoined: 3,
        },
        {
            id: 2,
            title: "Advanced Training Session",
            startDateTime: "2026-10-28T10:00:00",
            endDateTime: "2026-10-28T12:00:00",
            hostName: "Coach Elena",
            location: "Westside Sports Hall",
            role: "guest",
            rsvpStatus: "going",
            playersJoined: 5,
        },
        {
            id: 3,
            title: "Sunday Smash Session",
            startDateTime: "2026-11-02T14:00:00",
            endDateTime: "2026-11-02T17:00:00",
            location: "Manchester Badminton Arena",
            role: "host",
            playersJoined: 6,
        },
        {
            id: 4,
            title: "Beginner Friendly Match",
            startDateTime: "2026-11-05T18:30:00",
            endDateTime: "2026-11-05T20:00:00",
            hostName: "James Carter",
            location: "North Community Court",
            role: "guest",
            rsvpStatus: "not_sure",
            playersJoined: 4,
        },
    ]);

    const handleSaveGame = (updatedGame) => {
        setGames((prevGames) =>
            prevGames.map((game) =>
                game.id === updatedGame.id ? updatedGame : game,
            ),
        );
    };

    const handleRsvpSubmit = ({ gameId, rsvpStatus }) => {
        setGames((prevGames) =>
            prevGames.map((game) =>
                game.id === gameId
                    ?
                    {
                        ...game,
                        rsvpStatus,
                    }
                    : game,
            ),
        );
    };

    return (
        <div className="upcomingGamesPage_outlet">
            {games.map((game) => (
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
