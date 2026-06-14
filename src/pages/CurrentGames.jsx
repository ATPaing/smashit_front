import CurrentGameCard from "../components/CurrentGameCard";

import { useGamesContext } from "../hooks/useGameContext";

import "./CurrentGames.css";

const CurrentGames = () => {
    const { games, isLoadingGames } = useGamesContext();

    const now = new Date();

    const currentGames = games
        .filter(
            (game) =>
                new Date(game.startTime) <= now &&
                new Date(game.endTime) >= now,
        )
        .map((game) => ({
            id: game.id,
            title: game.name,
            startDateTime: game.startTime,
            endDateTime: game.endTime,
            location: game.location,
            hostName: game.host?.name || "Unknown host",
            invitees:
                game.invitation?.map((invite) => ({
                    id: invite.user?.id || invite.userId,
                    name: invite.user?.name || "Unknown player",
                })) || [],
        }));

    if (isLoadingGames) {
        return (
            <div className="currentGames">
                <p>Loading current games...</p>
            </div>
        );
    }

    return (
        <div className="currentGames">
            <div className="currentGames_header">
                <h2>Current Games</h2>
                <p>
                    These games are currently in progress. Player rosters are
                    locked and participation is no longer available.
                </p>
            </div>

            <div className="currentGames_grid">
                {currentGames.map((game) => (
                    <CurrentGameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default CurrentGames;